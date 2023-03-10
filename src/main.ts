import { loadFontsAsync, once, showUI } from '@create-figma-plugin/utilities'

import { InsertCodeHandler } from './types'

export default function () {
  once<InsertCodeHandler>('INSERT_JSON', async function (code: string) {
    const text = figma.createText()
    await loadFontsAsync([text])
    text.characters = code
    figma.currentPage.selection = [text]
    figma.viewport.scrollAndZoomIntoView([text])
    figma.closePlugin()
  })
  showUI({ height: 350, width: 420 })
}
