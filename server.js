import app from "./app";
import { UserModel } from "./src/api/v1/models/user.model";
import connect_mongodb from "./src/config/connection_mongodb";
import { connect_redis } from "./src/config/connection_redis";
import { client } from "./src/config/connection_redis";

const APP_HOST = process.env.APP_HOST;
const APP_PORT = process.env.APP_PORT;

connect_mongodb();
connect_redis();

// const subscriber = client.duplicate();

// subscriber.connect();

// subscriber.pSubscribe("__keyevent@0__:expired", async (message, channel) => {
//   console.log("Message", message);
//   const userId = message;
//   const user = await UserModel.findOne({
//     _id: userId,
//   });
//   console.log("User", user);
//   if (!user.isActive) {
//     await UserModel.deleteOne({
//       _id: userId,
//     });
//     console.log("Delete user with id", userId);
//   }

//   console.log(message, channel); // 'message', 'channel'
// });
// subscriber.on("pmessage", function (channel, pattern, message) {
//   console.log("Received message '%s' from channel '%s'", message, channel);
// });
app.listen(APP_PORT, APP_HOST, () => {
  console.log(`Start server on ${APP_HOST}:${APP_PORT}`);
});
