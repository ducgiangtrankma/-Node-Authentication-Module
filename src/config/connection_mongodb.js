import mongoose from "mongoose";

/**
 * Connect to DB
 */
let connect_mongodb = () => {
  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  // let URI = "mongodb://localhost:27017/Authentication";
  const conn = mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("open", function () {
    console.log(`Mongodb::: connected:::${this.name}`);
  });
  mongoose.connection.on("disconnected", function () {
    console.log(`Mongodb::: disconnected:::${this.name}`);
  });
  mongoose.connection.on("error", function (error) {
    console.log(`Mongodb::: connected:::${JSON.stringify(error)}`);
  });
  // //Disconnect mongodb khi kill node terminal
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });

  return conn;
};

export default connect_mongodb;
