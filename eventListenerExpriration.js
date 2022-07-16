import { createClient } from "redis";
import express from "express";

const client = createClient({
  port: 6379,
  host: "127.0.0.1",
});
const app = express();

const subscriber = client.duplicate();
subscriber.connect();
// client.psubscribe("__keyevent@0__:expired");

subscriber.pSubscribe("__keyevent@0__:expired", async (message, channel) => {
  const userId = message;

  console.log("Delete user with id", userId);

  console.log(message, channel); // 'message', 'channel'
});

app.listen(process.env.PORT || 3010, () => {
  console.log(`EventListener is running 3010`);
});
