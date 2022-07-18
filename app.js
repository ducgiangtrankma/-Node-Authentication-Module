import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { routes } from "./src/api/v1/routes";
const app = express();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

app.use(routes);

//Cổng handle lỗi
app.use((error, req, res, next) => {
  console.log("App error", error);
  res.status(error.status).send(error);
});

export default app;
