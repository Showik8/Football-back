import type { Request, Response } from "express";
import { players } from "../constants";
type Player = {
  id: number;
  name: string;
  jersey: number;
  goal: number;
  matchPlayed?: number;
  assist: number;
  view: number;
};

function top5(arg: keyof Player, list: Player[]): Player[] {
  return [...list]
    .sort((a, b) => ((b[arg] ?? 0) as number) - ((a[arg] ?? 0) as number))
    .slice(0, 5);
}

// const topGoalScorers = top5("goal", players);
// const topAssists = top5("assist", players);
// const topViewers = top5("view", players);
// const topMatchPlayed = top5("matchPlayed", players);

const Top5 = {
  topGoalScorers: top5("goal", players),
  topAssists: top5("assist", players),
  topViewers: top5("view", players),
  topMatchPlayed: top5("matchPlayed", players),
};

export const getTop5 = (_req: Request, res: Response) => {
  res.json(Top5);
};
