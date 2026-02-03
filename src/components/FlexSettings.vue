<script setup lang="ts">
import type { FlexSettings } from '../types/flex'
import {
  DISPLAY_OPTIONS,
  FLEX_DIRECTION_OPTIONS,
  JUSTIFY_CONTENT_OPTIONS,
  ALIGN_ITEMS_OPTIONS,
  ALIGN_CONTENT_OPTIONS,
  FLEX_WRAP_OPTIONS,
  OPTION_LABELS
} from '../types/flex'

const props = defineProps<{
  settings: FlexSettings
}>()

const emit = defineEmits<{
  updateSettings: [settings: Partial<FlexSettings>]
  addBox: []
  removeBox: []
  reset: []
}>()

const update = <K extends keyof FlexSettings>(key: K, e: Event) => {
  emit('updateSettings', { [key]: (e.target as HTMLSelectElement | HTMLInputElement).value })
}
</script>

<template>
  <div class="settings-card">
    <h2>Settings</h2>

    <div class="form-group">
      <label for="display">Display:</label>
      <select id="display" :value="settings.display" @input="update('display', $event)">
        <option v-for="opt in DISPLAY_OPTIONS" :key="opt" :value="opt">
          {{ OPTION_LABELS[opt] }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="flex-direction">Flex Direction:</label>
      <select id="flex-direction" :value="settings.flexDirection" @input="update('flexDirection', $event)">
        <option v-for="opt in FLEX_DIRECTION_OPTIONS" :key="opt" :value="opt">
          {{ OPTION_LABELS[opt] }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="justify-content">Justify Content:</label>
      <select id="justify-content" :value="settings.justifyContent" @input="update('justifyContent', $event)">
        <option v-for="opt in JUSTIFY_CONTENT_OPTIONS" :key="opt" :value="opt">
          {{ OPTION_LABELS[opt] }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="align-items">Align Items:</label>
      <select id="align-items" :value="settings.alignItems" @input="update('alignItems', $event)">
        <option v-for="opt in ALIGN_ITEMS_OPTIONS" :key="opt" :value="opt">
          {{ OPTION_LABELS[opt] }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="flex-wrap">Flex Wrap:</label>
      <select id="flex-wrap" :value="settings.flexWrap" @input="update('flexWrap', $event)">
        <option v-for="opt in FLEX_WRAP_OPTIONS" :key="opt" :value="opt">
          {{ OPTION_LABELS[opt] }}
        </option>
      </select>
    </div>

    <div v-if="props.settings.flexWrap !== 'nowrap'" class="form-group">
      <label for="align-content">Align Content:</label>
      <select id="align-content" :value="settings.alignContent" @input="update('alignContent', $event)">
        <option v-for="opt in ALIGN_CONTENT_OPTIONS" :key="opt" :value="opt">
          {{ OPTION_LABELS[opt] }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="gap">Gap:</label>
      <input
        id="gap"
        type="text"
        :value="settings.gap"
        placeholder="e.g., 10px"
        @input="update('gap', $event)"
      />
    </div>

    <div class="form-actions">
      <button class="btn-add" @click="emit('addBox')">Add Box</button>
      <button class="btn-remove" @click="emit('removeBox')">Remove Box</button>
      <button class="btn-reset" @click="emit('reset')">Reset</button>
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
  color: white;
  transition: filter 0.2s;
}

.form-actions button:hover {
  filter: brightness(0.9);
}

.btn-add { background: #4a90d9; }
.btn-remove { background: #e74c3c; }
.btn-reset { background: #95a5a6; }
</style>
