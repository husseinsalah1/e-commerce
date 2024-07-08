import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import { Connection } from "./config/connection";
import rootRouter from "./routes";
import { errorMiddleware } from "./middlewares/errors";
import { requestLogger } from "./middlewares/requestLogger";

// Database connection
Connection.connect();
// Express app
const app: Express = express();
// Constants
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(requestLogger);

// Routes
app.use("/api", rootRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("it's working....");
});

//Global Error handling middleware
app.use(errorMiddleware);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
