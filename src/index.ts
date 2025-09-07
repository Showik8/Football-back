import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import { matches, news, players, tournaments } from "./constants";
import { VercelRequest, VercelResponse } from "@vercel/node";

type Player = {
  id: number;
  name: string;
  jersey: number;
  goal: number;
  matchPlayed?: number;
  assist: number;
  view: number;
};

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://your-next-app.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g. server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

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
  res.json({ message: "Hello" });
});

app.get("/api/matches", (_req: Request, res: Response) => {
  res.json(matches);
});

app.get("/api/news", (_req: Request, res: Response) => {
  res.json(news);
});

app.get("/api/statistic", (_req: Request, res: Response) => {
  res.json({ topGoalScorers, topAssists, topViewers, topMatchPlayed });
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

export default (req: VercelRequest, res: VercelResponse) => app(req, res);

app.listen(8888, () => {
  console.log("working");
});
