import "./App.css";
import "./customBlocks/custom_Blocks";
import React, { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import Button from '@material-ui/core/Button';

export default function App() {
  const [xml, setXml] = useState("");
  const [javascriptCode, setJavascriptCode] = useState("");
  const [output, setOutput] = useState("");

  const initialXml = '<xml xmlns="http://www.w3.org/1999/xhtml" id="123" ></xml>';
  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Bot Blocks",
        colour: "#5CA699",
        contents: [
          {
            kind: "block",
            type: "questions"
          },
          {
            kind: "block",
            type: "bot"
          }
        ],
      },
    ],
  };

  function workspaceDidChange(workspace) {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    setJavascriptCode(code);
  }

  function reset() {
    Blockly.mainWorkspace.clear()
    setXml(initialXml); setJavascriptCode(""); setOutput("")
  }

  function runCode(code) {
    try {
      setOutput(eval(code));
    } catch (e) {
      alert(e);
    }
  }

  return (
    <>
      <div className="parent" >
        <div style={{ width: "100%" }} >
          <BlocklyWorkspace
            toolboxConfiguration={toolboxCategories}
            initialXml={initialXml}
            className="fill-height"
            workspaceConfiguration={{
              grid: {
                spacing: 20,
                length: 3,
                colour: "#ccc",
                snap: true,
              },
            }}
            onWorkspaceChange={workspaceDidChange}
            onXmlChange={setXml}
          />
        </div>
        <div className="wrap" >
          <div>
            <div style={{ textAlign: "center", width: "100%", marginBottom: "20px" }} >
              {output}
            </div>
            <div className="wrap" >
              <div>
                <Button variant="contained" color="primary" style={{ margin: "0px 10px" }} onClick={() => { runCode(javascriptCode) }} >
                  Run
                </Button>
                <Button variant="contained" color="secondary" onClick={() => { reset() }} >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
