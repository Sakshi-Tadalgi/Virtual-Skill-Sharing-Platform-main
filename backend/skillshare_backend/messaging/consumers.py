import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"
        print(f"✅ Connected to room: {self.room_name}")

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        print(f"⚠️ Disconnected from room: {self.room_name} with code {close_code}")
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        print("📩 Message received:", text_data)
        try:
            data = json.loads(text_data)
            message = data.get("message") or data.get("content")
            print(f"🧩 Parsed message: {message}")

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": message,
                }
            )
        except Exception as e:
            print("❌ Error in receive:", e)

    async def chat_message(self, event):
        message = event["message"]
        print("📤 Sending message to frontend:", message)

        await self.send(text_data=json.dumps({
            "message": message,
        }))
