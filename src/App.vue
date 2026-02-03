<script setup lang="ts">
import { ref } from 'vue'
import FlexSettings from './components/FlexSettings.vue'
import FlexItemsSettings from './components/FlexItemsSettings.vue'
import { useFlexGenerator } from './composables/useFlexGenerator'
import { PRESETS } from './types/flex'

const currentTab = ref<'container' | 'items'>('container')
const currentYear = new Date().getFullYear()
const {
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
} = useFlexGenerator()
</script>

<template>
  <div id="app">
    <header>
      <h1>CSS Flex Generator</h1>
    </header>

    <main>
      <section class="layout">
        <div class="settings">
          <div class="presets">
            <label>Presets:</label>
            <div class="preset-buttons">
              <button
                v-for="preset in PRESETS"
                :key="preset.name"
                class="preset-btn"
                @click="applyPreset(preset)"
              >
                {{ preset.name }}
              </button>
            </div>
          </div>

          <div class="tabs">
            <button
              :class="['tab-button', { active: currentTab === 'container' }]"
              @click="currentTab = 'container'"
            >
              Flex Container
            </button>
            <button
              :class="['tab-button', { active: currentTab === 'items' }]"
              @click="currentTab = 'items'"
            >
              Flex Items
            </button>
          </div>

          <div class="tab-content">
            <FlexSettings
              v-if="currentTab === 'container'"
              :settings="settings"
              @update-settings="updateSettings"
              @add-box="addItem"
              @remove-box="removeItem"
              @reset="reset"
            />
            <FlexItemsSettings
              v-if="currentTab === 'items'"
              :boxes="items"
              @update-item="updateItem"
            />
          </div>
        </div>

        <div class="preview-and-code">
          <div class="preview">
            <h2>Preview</h2>
            <div id="preview-box" :style="containerStyles">
              <div
                v-for="(item, index) in items"
                :key="index"
                class="box"
                :style="{ order: item.order, alignSelf: item.alignSelf, flex: item.flex }"
              >
                {{ index + 1 }}
              </div>
            </div>
          </div>

          <div class="code">
            <h2>Generated CSS</h2>
            <textarea readonly class="code-output" :value="generatedCSS" />
            <button class="copy-btn" @click="copyCSS">Copy</button>
            <p v-if="copySuccess" class="copy-message">Copied to clipboard!</p>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>
        © {{ currentYear }} CSS Flex Generator |
        <a href="https://codequest.work/" target="_blank" rel="noopener noreferrer">Created by CodeQuest</a> |
        <a href="https://codequest.work/generator/grid/" target="_blank" rel="noopener noreferrer">Grid Generator</a>
      </p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  text-align: center;
}

header h1 {
  margin: 0;
  color: white;
  font-size: 1.75rem;
}

main {
  flex: 1;
  padding: 24px;
  background: #f5f7fa;
}

.layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

.settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.presets {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.presets label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.preset-btn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f8f9fa;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.preset-btn:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.tabs {
  display: flex;
  gap: 8px;
}

.tab-button {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: #e0e5ec;
  color: #666;
  transition: all 0.2s;
}

.tab-button.active {
  background: #667eea;
  color: white;
}

.tab-button:hover:not(.active) {
  background: #d0d5dc;
}

.tab-content {
  max-height: calc(100vh - 360px);
  overflow-y: auto;
}

.preview-and-code {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.preview,
.code {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preview h2,
.code h2 {
  margin: 0 0 16px;
  font-size: 1.125rem;
  color: #333;
}

#preview-box {
  min-height: 200px;
  padding: 20px;
  background: #f8f9fa;
  border: 2px dashed #ddd;
  border-radius: 8px;
}

.box {
  min-width: 60px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.box:nth-child(2) { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.box:nth-child(3) { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.box:nth-child(4) { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.box:nth-child(5) { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.box:nth-child(6) { background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%); }

.code-output {
  width: 100%;
  min-height: 180px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  line-height: 1.5;
  resize: vertical;
  background: #1e1e1e;
  color: #d4d4d4;
}

.copy-btn {
  margin-top: 12px;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: #667eea;
  color: white;
  transition: background 0.2s;
}

.copy-btn:hover {
  background: #5a6fd6;
}

.copy-message {
  margin-top: 8px;
  color: #27ae60;
  font-size: 14px;
  font-weight: 500;
}

footer {
  background: #2c3e50;
  padding: 16px;
  text-align: center;
}

footer p {
  margin: 0;
  color: #bdc3c7;
  font-size: 14px;
}

footer a {
  color: #3498db;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
</style>
