// 選択肢の型定義
export const DISPLAY_OPTIONS = ['flex', 'inline-flex'] as const
export const FLEX_DIRECTION_OPTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const
export const JUSTIFY_CONTENT_OPTIONS = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'] as const
export const ALIGN_ITEMS_OPTIONS = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'] as const
export const ALIGN_CONTENT_OPTIONS = ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'] as const
export const FLEX_WRAP_OPTIONS = ['nowrap', 'wrap', 'wrap-reverse'] as const
export const ALIGN_SELF_OPTIONS = ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'] as const

// 型定義
export type Display = typeof DISPLAY_OPTIONS[number]
export type FlexDirection = typeof FLEX_DIRECTION_OPTIONS[number]
export type JustifyContent = typeof JUSTIFY_CONTENT_OPTIONS[number]
export type AlignItems = typeof ALIGN_ITEMS_OPTIONS[number]
export type AlignContent = typeof ALIGN_CONTENT_OPTIONS[number]
export type FlexWrap = typeof FLEX_WRAP_OPTIONS[number]
export type AlignSelf = typeof ALIGN_SELF_OPTIONS[number]

export interface FlexSettings {
  display: Display
  flexDirection: FlexDirection
  justifyContent: JustifyContent
  alignItems: AlignItems
  alignContent: AlignContent
  flexWrap: FlexWrap
  gap: string
}

export interface FlexItem {
  order: number
  alignSelf: AlignSelf
  flex: string
}

// 表示ラベルのマッピング
export const OPTION_LABELS: Record<string, string> = {
  'flex': 'Flex',
  'inline-flex': 'Inline Flex',
  'row': 'Row',
  'row-reverse': 'Row Reverse',
  'column': 'Column',
  'column-reverse': 'Column Reverse',
  'flex-start': 'Flex Start',
  'flex-end': 'Flex End',
  'center': 'Center',
  'space-between': 'Space Between',
  'space-around': 'Space Around',
  'stretch': 'Stretch',
  'baseline': 'Baseline',
  'nowrap': 'No Wrap',
  'wrap': 'Wrap',
  'wrap-reverse': 'Wrap Reverse',
  'auto': 'Auto'
}

// デフォルト値
export const DEFAULT_FLEX_SETTINGS: FlexSettings = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'stretch',
  flexWrap: 'nowrap',
  gap: '10px'
}

export const DEFAULT_FLEX_ITEM: FlexItem = {
  order: 0,
  alignSelf: 'auto',
  flex: '0'
}

export const createFlexItem = (): FlexItem => ({ ...DEFAULT_FLEX_ITEM })

// プリセット定義
export interface Preset {
  name: string
  settings: FlexSettings
  itemCount: number
}

export const PRESETS: Preset[] = [
  {
    name: 'Center (横中央)',
    settings: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'stretch',
      flexWrap: 'nowrap',
      gap: '10px'
    },
    itemCount: 3
  },
  {
    name: 'Space Between',
    settings: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'stretch',
      flexWrap: 'nowrap',
      gap: '0px'
    },
    itemCount: 3
  },
  {
    name: 'Column Stack',
    settings: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      alignContent: 'stretch',
      flexWrap: 'nowrap',
      gap: '16px'
    },
    itemCount: 3
  },
  {
    name: 'Card Grid',
    settings: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      alignContent: 'flex-start',
      flexWrap: 'wrap',
      gap: '16px'
    },
    itemCount: 6
  },
  {
    name: 'Sidebar Layout',
    settings: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      alignContent: 'stretch',
      flexWrap: 'nowrap',
      gap: '0px'
    },
    itemCount: 2
  },
  {
    name: 'Footer Sticky',
    settings: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      alignContent: 'stretch',
      flexWrap: 'nowrap',
      gap: '0px'
    },
    itemCount: 3
  }
]
