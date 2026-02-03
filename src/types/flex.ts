// Flexコンテナの設定
export interface FlexSettings {
  display: 'flex' | 'inline-flex'
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
  alignItems: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap: string
}

// Flexアイテムの設定
export interface FlexItem {
  order: number
  alignSelf: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  flex: string
}

// デフォルト値
export const defaultFlexSettings: FlexSettings = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flexWrap: 'nowrap',
  gap: '10px'
}

export const createDefaultFlexItem = (): FlexItem => ({
  order: 0,
  alignSelf: 'auto',
  flex: '0'
})
