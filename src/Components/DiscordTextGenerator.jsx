import { useState, useRef } from "react";
import { Button, Group, ColorInput, Card, Stack } from "@mantine/core";

export default function TextEditor() {
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const editorRef = useRef(null);

  const applyStyle = (style) => {
    document.execCommand(style);
  };

  const applyColor = (command, color) => {
    if (editorRef.current) {
      document.execCommand(command, false, color);
    }
  };

  const copyToClipboard = () => {
    if (editorRef.current) {
      navigator.clipboard.writeText(editorRef.current.innerHTML);
    }
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      style={{
        maxWidth: 600,
        margin: "auto",
        backgroundColor: "#fdfdfd",
        border: "1px solid #e0e0e0",
      }}
    >
      <Stack spacing="md">
        <Group position="center">
          <Button variant="filled" color="blue" onClick={() => applyStyle("bold")}>
            Bold
          </Button>
          <Button variant="filled" color="cyan" onClick={() => applyStyle("italic")}>
            Italic
          </Button>
          <Button variant="filled" color="purple" onClick={() => applyStyle("underline")}>
            Underline
          </Button>
        </Group>

        <Group position="center">
          <ColorInput label="Text Color" value={textColor} onChange={setTextColor} />
          <Button variant="filled" color="gray" onClick={() => applyColor("foreColor", textColor)}>
            Apply Text Color
          </Button>
          <ColorInput label="Background Color" value={bgColor} onChange={setBgColor} />
          <Button variant="filled" color="gray" onClick={() => applyColor("hiliteColor", bgColor)}>
            Apply Background Color
          </Button>
        </Group>

        <Group position="center">
          <Button variant="light" color="red" onClick={() => applyStyle("removeFormat")}>
            Reset
          </Button>
          <Button variant="light" color="green" onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
        </Group>

        <div
          ref={editorRef}
          contentEditable
          style={{
            marginTop: "10px",
            minHeight: "150px",
            padding: "15px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            fontSize: "16px",
            lineHeight: "1.5",
            color: "#333333",
          }}
        ></div>
      </Stack>
    </Card>
  );
}