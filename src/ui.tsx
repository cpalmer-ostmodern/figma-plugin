import "!prismjs/themes/prism.css";

import {
  Button,
  Container,
  render,
  Textbox,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";
import styles from "./styles.css";

function Plugin() {
  const [tokens, setTokens] = useState(`insert JSON file here`);
  const [endpoint, setEndpoint] = useState("http://api.endpoint/example");
  const [response, setResponse] = useState(`no tokens received.`);

  const handleAPI = (e: any) => {
    e.preventDefault();
    setEndpoint(e.target.value);
  };

  const handleInsertCodeButtonClick = useCallback(
    async function () {
      let body = tokens;
      let request = new XMLHttpRequest();
      
      request.open("POST", endpoint, true);
      request.setRequestHeader("Content-type", "application/json");
      request.setRequestHeader("Accept", "*/*");
      request.onreadystatechange = function () {
        //Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
          alert('API request successful');
        }
      };
      request.send(body);
      request.responseType = "text";
      request.onload = () => {
        // console.log(request.response);
        if (request.status === 200) {
          setResponse("sucess !");
        }
        setResponse('API POST successful.');
      };
    },
    [tokens, response, endpoint]
  );
  return (
    <Container space="large">
      <VerticalSpace space="small" />
      Enter API URL below:
      <br></br>
            <Textbox 
              onChange={(e) => handleAPI(e)}
              value={endpoint}
            ></Textbox>
      <VerticalSpace space="small" />
      <VerticalSpace space="medium" />
      <div class={styles.container}>
        <Editor
          highlight={function (tokens: string) {
            return highlight(tokens, languages.js, "js");
          }}
          onValueChange={setTokens}
          preClassName={styles.editor}
          textareaClassName={styles.editor}
          value={tokens}
        />
      </div>
      <VerticalSpace space="large" />
      {response}
      <Button fullWidth onClick={handleInsertCodeButtonClick}>
        Send To API
      </Button>
      <VerticalSpace space="small"></VerticalSpace>
    </Container>
  );
}

export default render(Plugin);
