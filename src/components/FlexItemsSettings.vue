<script setup lang="ts">
import type { FlexItem } from '../types/flex'
import { ALIGN_SELF_OPTIONS, OPTION_LABELS } from '../types/flex'

defineProps<{
  boxes: FlexItem[]
}>()

const emit = defineEmits<{
  updateItem: [index: number, updates: Partial<FlexItem>]
}>()

const updateOrder = (index: number, e: Event) => {
  emit('updateItem', index, { order: parseInt((e.target as HTMLInputElement).value) || 0 })
}

const updateFlex = (index: number, e: Event) => {
  emit('updateItem', index, { flex: (e.target as HTMLInputElement).value })
}

const updateAlignSelf = (index: number, e: Event) => {
  emit('updateItem', index, { alignSelf: (e.target as HTMLSelectElement).value as FlexItem['alignSelf'] })
}
</script>

<template>
  <div class="items-settings">
    <div v-for="(box, index) in boxes" :key="index" class="item-settings">
      <h3>Item {{ index + 1 }}</h3>

      <label>
        Order:
        <input type="number" :value="box.order" @input="updateOrder(index, $event)" />
      </label>

      <label>
        Flex:
        <input type="number" step="1" min="0" :value="box.flex" @input="updateFlex(index, $event)" />
      </label>

      <label>
        Align Self:
        <select :value="box.alignSelf" @change="updateAlignSelf(index, $event)">
          <option v-for="opt in ALIGN_SELF_OPTIONS" :key="opt" :value="opt">
            {{ OPTION_LABELS[opt] }}
          </option>
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
