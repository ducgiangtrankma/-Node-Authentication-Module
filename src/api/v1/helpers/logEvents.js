import { appendFile } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { format, compareAsc } from "date-fns";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const fileName = path.join(__dirname, "../logs", "log.log");

const logEvents = async (msg) => {
  const dateTime = `${format(new Date(), "MM/dd/yyyy HH:mm:ss")}`;
  const contentLog = `${dateTime}------${msg}\n`;
  try {
    appendFile(fileName, contentLog, (err, res) => {});
  } catch (error) {
    console.log(error);
  }
};

export { logEvents };
