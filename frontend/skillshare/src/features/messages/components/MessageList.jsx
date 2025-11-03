import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../actions/messageActions";
import MessageThread from "./MessageThread";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function MessageList() {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading messages...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Failed to load messages: {error}
      </Typography>
    );
  }

  return <MessageThread messages={messages} />;
}
