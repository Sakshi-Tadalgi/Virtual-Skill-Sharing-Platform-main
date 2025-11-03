import { useEffect, useRef } from "react";

export function useWebSocket(roomName, onMessage) {
  const socketRef = useRef(null);

  useEffect(() => {
    let socket;
    const connectWebSocket = () => {
      const wsUrl = `ws://127.0.0.1:8000/ws/chat/${roomName}/`;
      console.log("Connecting to WebSocket:", wsUrl);

      socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("✅ WebSocket connected");
      };

      socket.onmessage = (event) => {
        if (onMessage) onMessage(event.data);
      };

      socket.onerror = (err) => {
        console.error("❌ WebSocket error:", err);
      };

      socket.onclose = () => {
        console.warn("⚠️ WebSocket closed");
      };
    };

    // Delay connection by 500ms to avoid initial race condition
    const timeout = setTimeout(() => {
      connectWebSocket();
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomName, onMessage]);

  const send = (data) => {
  if (socketRef.current?.readyState === WebSocket.OPEN) {
    socketRef.current.send(data);
  } else {
    console.warn("WebSocket not open yet, retrying...");
    setTimeout(() => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(data);
      } else {
        console.error("❌ WebSocket still not open, message dropped.");
      }
    }, 500);
  }
};

  return { send, socket: socketRef.current };
}
