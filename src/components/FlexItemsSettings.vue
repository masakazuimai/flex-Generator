<script setup lang="ts">
import type { FlexItem } from '../types/flex'

// Props
defineProps<{
  boxes: FlexItem[]
}>()

// Emits
const emit = defineEmits<{
  updateOrder: [index: number, value: number]
  updateAlignSelf: [index: number, value: FlexItem['alignSelf']]
  updateFlex: [index: number, value: string]
}>()

// 更新ハンドラー
const handleOrderUpdate = (index: number, event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value) || 0
  emit('updateOrder', index, value)
}

const handleFlexUpdate = (index: number, event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('updateFlex', index, value)
}

const handleAlignSelfUpdate = (index: number, event: Event) => {
  const value = (event.target as HTMLSelectElement).value as FlexItem['alignSelf']
  emit('updateAlignSelf', index, value)
}
</script>

<template>
  <div class="items-settings">
    <div
      v-for="(box, index) in boxes"
      :key="index"
      class="item-settings"
    >
      <h3>Item {{ index + 1 }}</h3>

      <label>
        Order:
        <input
          type="number"
          :value="box.order"
          @input="handleOrderUpdate(index, $event)"
        />
      </label>

      <label>
        Flex:
        <input
          type="number"
          step="1"
          min="0"
          :value="box.flex"
          @input="handleFlexUpdate(index, $event)"
        />
      </label>

      <label>
        Align Self:
        <select
          :value="box.alignSelf"
          @change="handleAlignSelfUpdate(index, $event)"
        >
          <option value="auto">Auto</option>
          <option value="flex-start">Flex Start</option>
          <option value="flex-end">Flex End</option>
          <option value="center">Center</option>
          <option value="baseline">Baseline</option>
          <option value="stretch">Stretch</option>
        </select>
      </label>
    </div>
  </div>
</template>

<style scoped>
.items-settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item-settings {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-settings h3 {
  margin: 0 0 12px;
  font-size: 1rem;
  color: #333;
}

.item-settings label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-weight: 500;
  color: #555;
}

.item-settings input,
.item-settings select {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.item-settings input:focus,
.item-settings select:focus {
  outline: none;
  border-color: #4a90d9;
}
</style>
