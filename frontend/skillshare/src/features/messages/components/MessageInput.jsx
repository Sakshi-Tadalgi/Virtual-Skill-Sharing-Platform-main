import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function MessageInput({ onSend }) {
  const [content, setContent] = useState("");

  const handleSend = () => {
    if (content.trim()) {
      onSend(content);
      setContent("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={3}
        label="Type a message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button variant="contained" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
}
