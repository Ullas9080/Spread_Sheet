import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import processRoutes from "./routes/processRoutes.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(uploadRoutes);
app.use(processRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
