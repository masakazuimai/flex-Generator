import { ref, computed, type CSSProperties } from 'vue'
import type { FlexSettings, FlexItem, Preset } from '../types/flex'
import { DEFAULT_FLEX_SETTINGS, DEFAULT_FLEX_ITEM, createFlexItem } from '../types/flex'

export const useFlexGenerator = () => {
  // 状態
  const settings = ref<FlexSettings>({ ...DEFAULT_FLEX_SETTINGS })
  const items = ref<FlexItem[]>([createFlexItem(), createFlexItem(), createFlexItem()])
  const copySuccess = ref(false)

  // コンテナスタイル
  const containerStyles = computed<CSSProperties>(() => ({
    display: settings.value.display,
    flexDirection: settings.value.flexDirection,
    justifyContent: settings.value.justifyContent,
    alignItems: settings.value.alignItems,
    alignContent: settings.value.alignContent,
    flexWrap: settings.value.flexWrap,
    gap: settings.value.gap
  }))

  // CSS生成
  const generatedCSS = computed(() => {
    const showAlignContent = settings.value.flexWrap !== 'nowrap'

    let container = `.parent {
  display: ${settings.value.display};
  flex-direction: ${settings.value.flexDirection};
  justify-content: ${settings.value.justifyContent};
  align-items: ${settings.value.alignItems};`

    if (showAlignContent) {
      container += `\n  align-content: ${settings.value.alignContent};`
    }

    container += `
  flex-wrap: ${settings.value.flexWrap};
  gap: ${settings.value.gap};
}`

    const itemStyles = items.value
      .map((item, i) => {
        const isDefault = item.order === DEFAULT_FLEX_ITEM.order &&
          item.flex === DEFAULT_FLEX_ITEM.flex &&
          item.alignSelf === DEFAULT_FLEX_ITEM.alignSelf
        if (isDefault) return ''
        return `.parent .box:nth-child(${i + 1}) {
  order: ${item.order};
  flex: ${item.flex};
  align-self: ${item.alignSelf};
}`
      })
      .filter(Boolean)
      .join('\n\n')

    return itemStyles ? `${container}\n\n${itemStyles}` : container
  })

  // 設定更新
  const updateSettings = (updates: Partial<FlexSettings>) => {
    settings.value = { ...settings.value, ...updates }
  }

  // アイテム更新（汎用）
  const updateItem = (index: number, updates: Partial<FlexItem>) => {
    items.value = items.value.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    )
  }

  // アイテム操作
  const addItem = () => {
    items.value = [...items.value, createFlexItem()]
  }

  const removeItem = () => {
    if (items.value.length > 1) {
      items.value = items.value.slice(0, -1)
    }
  }

  // プリセット適用
  const applyPreset = (preset: Preset) => {
    settings.value = { ...preset.settings }
    items.value = Array.from({ length: preset.itemCount }, () => createFlexItem())
  }

  // リセット
  const reset = () => {
    settings.value = { ...DEFAULT_FLEX_SETTINGS }
    items.value = [createFlexItem(), createFlexItem(), createFlexItem()]
  }

  // コピー
  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(generatedCSS.value)
      copySuccess.value = true
      setTimeout(() => { copySuccess.value = false }, 2000)
    } catch {
      // コピー失敗
    }
  }

  return {
    settings,
    items,
    copySuccess,
    containerStyles,
    generatedCSS,
    updateSettings,
    updateItem,
    addItem,
    removeItem,
    applyPreset,
    reset,
    copyCSS
  }
}
