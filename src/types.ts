import { EventHandler } from '@create-figma-plugin/utilities'

export interface InsertCodeHandler extends EventHandler {
  name: 'INSERT_JSON'
  handler: (code: string) => Promise<any>;
}
