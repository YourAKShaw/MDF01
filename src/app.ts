import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import userRoutes from "./routes/userRoutes";
import { setupSwagger } from "./utils/swagger";

const app = express();

setupSwagger(app);

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);

export default app;
