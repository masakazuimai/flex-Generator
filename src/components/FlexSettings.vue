<script setup lang="ts">
import type { FlexSettings } from '../types/flex'

// Props
const props = defineProps<{
  settings: FlexSettings
}>()

// Emits
const emit = defineEmits<{
  updateSettings: [settings: Partial<FlexSettings>]
  addBox: []
  removeBox: []
  reset: []
}>()

// 設定更新
const updateSetting = <K extends keyof FlexSettings>(key: K, value: FlexSettings[K]) => {
  emit('updateSettings', { [key]: value })
}
</script>

<template>
  <div class="settings-card">
    <h2>Settings</h2>

    <div class="form-group">
      <label for="display">Display:</label>
      <select
        id="display"
        :value="props.settings.display"
        @input="updateSetting('display', ($event.target as HTMLSelectElement).value as FlexSettings['display'])"
      >
        <option value="flex">Flex</option>
        <option value="inline-flex">Inline Flex</option>
      </select>
    </div>

    <div class="form-group">
      <label for="flex-direction">Flex Direction:</label>
      <select
        id="flex-direction"
        :value="props.settings.flexDirection"
        @input="updateSetting('flexDirection', ($event.target as HTMLSelectElement).value as FlexSettings['flexDirection'])"
      >
        <option value="row">Row</option>
        <option value="row-reverse">Row Reverse</option>
        <option value="column">Column</option>
        <option value="column-reverse">Column Reverse</option>
      </select>
    </div>

    <div class="form-group">
      <label for="justify-content">Justify Content:</label>
      <select
        id="justify-content"
        :value="props.settings.justifyContent"
        @input="updateSetting('justifyContent', ($event.target as HTMLSelectElement).value as FlexSettings['justifyContent'])"
      >
        <option value="flex-start">Flex Start</option>
        <option value="flex-end">Flex End</option>
        <option value="center">Center</option>
        <option value="space-between">Space Between</option>
        <option value="space-around">Space Around</option>
      </select>
    </div>

    <div class="form-group">
      <label for="align-items">Align Items:</label>
      <select
        id="align-items"
        :value="props.settings.alignItems"
        @input="updateSetting('alignItems', ($event.target as HTMLSelectElement).value as FlexSettings['alignItems'])"
      >
        <option value="stretch">Stretch</option>
        <option value="flex-start">Flex Start</option>
        <option value="flex-end">Flex End</option>
        <option value="center">Center</option>
        <option value="baseline">Baseline</option>
      </select>
    </div>

    <div class="form-group">
      <label for="flex-wrap">Flex Wrap:</label>
      <select
        id="flex-wrap"
        :value="props.settings.flexWrap"
        @input="updateSetting('flexWrap', ($event.target as HTMLSelectElement).value as FlexSettings['flexWrap'])"
      >
        <option value="nowrap">No Wrap</option>
        <option value="wrap">Wrap</option>
        <option value="wrap-reverse">Wrap Reverse</option>
      </select>
    </div>

    <div class="form-group">
      <label for="gap">Gap:</label>
      <input
        id="gap"
        type="text"
        :value="props.settings.gap"
        placeholder="e.g., 10px"
        @input="updateSetting('gap', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <div class="form-actions">
      <button @click="emit('addBox')">Add Box</button>
      <button @click="emit('removeBox')">Remove Box</button>
      <button @click="emit('reset')">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.settings-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.settings-card h2 {
  margin: 0 0 20px;
  font-size: 1.25rem;
  color: #333;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #555;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group select:focus,
.form-group input:focus {
  outline: none;
  border-color: #4a90d9;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.form-actions button {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-actions button:nth-child(1) {
  background: #4a90d9;
  color: white;
}

.form-actions button:nth-child(1):hover {
  background: #3a7bc8;
}

.form-actions button:nth-child(2) {
  background: #e74c3c;
  color: white;
}

.form-actions button:nth-child(2):hover {
  background: #c0392b;
}

.form-actions button:nth-child(3) {
  background: #95a5a6;
  color: white;
}

.form-actions button:nth-child(3):hover {
  background: #7f8c8d;
}
</style>
