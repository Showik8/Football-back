import express from "express";
import type { Request, Response } from "express";
// import { VercelRequest, VercelResponse } from "@vercel/node";
import cors from "cors";
import { matches, news, players, tournaments } from "./constants";

type Player = {
  id: number;
  name: string;
  jersey: number;
  goal: number;
  matchPlayed?: number;
  assist: number;
  view: number;
};

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

function top5(arg: keyof Player, list: Player[]): Player[] {
  return [...list]
    .sort((a, b) => ((b[arg] ?? 0) as number) - ((a[arg] ?? 0) as number))
    .slice(0, 5);
}

const topGoalScorers = top5("goal", players);
const topAssists = top5("assist", players);
const topViewers = top5("view", players);
const topMatchPlayed = top5("matchPlayed", players);

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.send({ message: "Hello" });
});

app.get("/api/matches", (_req: Request, res: Response) => {
  res.send(matches);
});

app.get("/api/news", (_req: Request, res: Response) => {
  res.send(news);
});

app.get("/api/statistic", (_req: Request, res: Response) => {
  res.send({ topGoalScorers, topAssists, topViewers, topMatchPlayed });
});

app.get("/api/tournaments", (req: Request, res: Response) => {
  const ageCategory = req.query.ageCategory as string;
  const nameOfTournament = req.query.tournament as string;

  const tournament = tournaments.find(
    (t) => t.name === nameOfTournament && t.age === ageCategory
  );

  if (!tournament)
    return res.status(404).json({ message: "Not found", teams: [] });

  res.json(tournament.teams);
});

app.listen(7777, () => {
  console.log("works");
});

// export default (req: VercelRequest, res: VercelResponse) => app(req, res);
