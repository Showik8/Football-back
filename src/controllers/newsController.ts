import type { Request, Response } from "express";
import { news } from "../constants";

export const getNews = (_req: Request, res: Response) => {
  res.json(news);
};
