import { Box, Typography } from "@mui/material";

export default function MessageThread({ messages }) {
  return (
    <Box sx={{ p: 2 }}>
      {messages.map((msg, index) => {
        // Handle different message formats safely
        const sender =
          msg.sender?.username || msg.username || "Unknown";
        const receiver = msg.receiver?.username || "";
        const content = msg.content || msg.message || "";
        const timestamp = msg.timestamp || "";

        return (
          <Box key={msg.id || index} sx={{ mb: 2 }}>
            <Typography variant="subtitle2">
              {receiver ? `${sender} → ${receiver}` : sender}
            </Typography>
            <Typography variant="body1">{content}</Typography>
            {timestamp && (
              <Typography variant="caption" color="text.secondary">
                {new Date(timestamp).toLocaleString()}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
