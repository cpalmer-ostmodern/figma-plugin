import '!prismjs/themes/prism.css'

import {
  Button,
  Container,
  render,
  VerticalSpace,
  FileUploadButton
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import { highlight, languages } from 'prismjs'
import Editor from 'react-simple-code-editor'
import styles from './styles.css'
import { InsertCodeHandler } from './types'

function Plugin() {
  const [code, setCode] = useState(`insert JSON file here`)
  const handleInsertCodeButtonClick = useCallback(
    async function () {
        let request = new XMLHttpRequest()
        // This link has random lorem ipsum text
        request.open('GET', 'https://jsonplaceholder.typicode.com/todos/1')
        request.responseType = 'json'
        request.onload = () => {
          console.log(request.response)
        };
        let data = await request.send()
        return data;
      // emit<InsertCodeHandler>('INSERT_JSON', code)
    },
    [code]
  )
  return (
    <Container space="medium">
      <VerticalSpace space="small" />
      <div class={styles.container}>
        <Editor
          highlight={function (code: string) {
            return highlight(code, languages.js, 'js')
          }}
          onValueChange={setCode}
          preClassName={styles.editor}
          textareaClassName={styles.editor}
          value={code}
        />
      </div>
      <VerticalSpace space="large" />
      <Button fullWidth onClick={handleInsertCodeButtonClick}>
        Send To API
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin)
