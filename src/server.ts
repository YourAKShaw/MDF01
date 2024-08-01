import app from "./app";
import dotenv from "dotenv";
import logger from "./utils/logger";
import printAsciiArt from "./utils/printAsciiArt";

dotenv.config();

const PORT = process.env.PORT || 3000;

printAsciiArt();

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
