import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/messages/");
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
      // Return a clean error message
      return rejectWithValue(error.response?.data?.detail || "Failed to fetch messages");
    }
  }
);
