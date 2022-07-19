import app from "./app";
import connect_mongodb from "./src/config/connection_mongodb";
import { connect_redis } from "./src/config/connection_redis";
import { client } from "./src/config/connection_redis";
import faker from "faker";
import { ProductModel } from "./src/api/v1/models/product.model";
const APP_HOST = process.env.APP_HOST;
const APP_PORT = process.env.APP_PORT;

connect_mongodb();
connect_redis();

const subscriber = client.duplicate();

subscriber.connect();

subscriber.pSubscribe("__keyevent@0__:expired", async (message, channel) => {
  console.log("Message", message);
  const userId = message;
  const user = await UserModel.findOne({
    _id: userId,
  });
  console.log("User", user);
  if (!user.isActive) {
    await UserModel.deleteOne({
      _id: userId,
    });
    console.log("Delete user with id", userId);
  }

  console.log(message, channel); // 'message', 'channel'
});
// for (let index = 0; index < 56; index++) {
//   const item = {
//     name: faker.commerce.productName(),
//     price: faker.commerce.price(),
//     dateOfManufacture: faker.date.past(2).getTime(),
//     expirationDate: faker.date.past(2).getTime(),
//   };
//   await ProductModel.create(item);
// }
subscriber.on("pmessage", function (channel, pattern, message) {
  console.log("Received message '%s' from channel '%s'", message, channel);
});
app.listen(APP_PORT, APP_HOST, () => {
  console.log(`Start server on ${APP_HOST}:${APP_PORT}`);
});
