import type { Request, Response } from "express";
import { players } from "../constants";
type Player = {
  id: number;
  name: string;
  jersey: number;
  position: string;
  team: string;
  age: number;
  nationality: string;
  goal: number;
  assist: number;
  matchPlayed: number;
  view: number;
  yellowCards: number;
  redCards: number;
  height: number;
  weight: number;
  photoUrl: string;
};

function top5(arg: keyof Player, list: Player[]): Player[] {
  return [...list]
    .sort((a, b) => ((b[arg] ?? 0) as number) - ((a[arg] ?? 0) as number))
    .slice(0, 5);
}

const Top5 = {
  topGoalScorers: top5("goal", players),
  topAssists: top5("assist", players),
  topViewers: top5("view", players),
  topMatchPlayed: top5("matchPlayed", players),
};

export const getTop5 = (_req: Request, res: Response) => {
  res.json(Top5);
};
