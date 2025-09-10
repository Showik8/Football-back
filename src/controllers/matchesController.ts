import type { Request, Response } from "express";
import { matches } from "../constants";

export const getMatches = (_req: Request, res: Response) => {
  res.json(matches);
};
