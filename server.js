import app from "./app";
import connect_mongodb from "./src/config/connection_mongodb";

const APP_HOST = process.env.APP_HOST;
const APP_PORT = process.env.APP_PORT;

connect_mongodb();

app.listen(APP_PORT, APP_HOST, () => {
  console.log(`Start server on ${APP_HOST}:${APP_PORT}`);
});
