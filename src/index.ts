import express from "express";
import cors from "cors";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Request, Response } from "express";

const app = express();
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

export default (req: VercelRequest, res: VercelResponse) => app(req, res);
