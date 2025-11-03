import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "../actions/messageActions";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    markAsRead(state, action) {
      const msg = state.messages.find((m) => m.id === action.payload);
      if (msg) msg.is_read = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addMessage, markAsRead } = messageSlice.actions;
export default messageSlice.reducer;
