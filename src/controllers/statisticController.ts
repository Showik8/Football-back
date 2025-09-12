import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTop5 = async (_req: Request, res: Response) => {
  try {
    const [topGoalScorers, topAssists, topViewers, topMatchPlayed] =
      await Promise.all([
        prisma.players.findMany({
          select: { id: true, name: true, jersey: true, goal: true },
          orderBy: { goal: "desc" },
          take: 5,
        }),
        prisma.players.findMany({
          select: { id: true, name: true, jersey: true, assist: true },
          orderBy: { assist: "desc" },
          take: 5,
        }),
        prisma.players.findMany({
          select: { id: true, name: true, jersey: true, view: true },
          orderBy: { view: "desc" },
          take: 5,
        }),
        prisma.players.findMany({
          select: { id: true, name: true, jersey: true, match_played: true },
          orderBy: { match_played: "desc" },
          take: 5,
        }),
      ]);

    res.json({ topGoalScorers, topAssists, topViewers, topMatchPlayed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch top players" });
  }
};
