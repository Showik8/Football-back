import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";
import matchesRouter from "./routes/mathcesRouter";
import newsRouter from "./routes/newsRouter";
import statisticRouter from "./routes/statisticRouter";
import tournamentsRouter from "./routes/tournamentsRouter";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const allowedOrigins = [process.env.PROD_HOST!];

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

app.use("/api/matches", matchesRouter);

app.use("/api/news", newsRouter);

app.use("/api/statistic", statisticRouter);

app.use("/api/tournaments", tournamentsRouter);

export default (req: VercelRequest, res: VercelResponse) => app(req, res);

app.listen(8888, () => {
  console.log("working");
});
