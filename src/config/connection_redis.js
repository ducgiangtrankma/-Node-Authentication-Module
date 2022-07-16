import { createClient } from "redis";
const client = createClient({
  port: 6379,
  host: "127.0.0.1",
});
const connect_redis = async () => {
  client.connect();

  client.on("error", function (error) {
    console.log(error);
  });
  client.on("connect", function (error) {
    console.log("connected");
  });
  client.on("ready", function (error) {
    console.log("Redis to ready");
  });
};

export { connect_redis, client };
