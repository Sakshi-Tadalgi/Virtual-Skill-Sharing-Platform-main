import { useDispatch } from "react-redux";
import { addMessage } from "../slice/messageSlice";
import { useWebSocket } from "../../../hooks/useWebSocket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Box, Typography } from "@mui/material";

export default function ChatRoom({ roomName }) {
  const dispatch = useDispatch();

  // Use parsed data directly from useWebSocket
  const { send } = useWebSocket(roomName, (data) => {
    // Ensure data has message content before dispatch
    if (data && data.message) {
      dispatch(addMessage(data));
    }
  });

  const handleSend = (content) => {
    const message = {
      message: content,
      timestamp: new Date().toISOString(),
    };
    send(message);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Chat Room: {roomName}
      </Typography>
      <MessageList />
      <MessageInput onSend={handleSend} />
    </Box>
  );
}
