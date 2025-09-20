import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTop5 = async (_req: Request, res: Response) => {
  try {
    const [topGoalScorers, topAssists, topViewers, topMatchPlayed] =
      await Promise.all([
        prisma.player_statistic.findMany({
          select: {
            goal: true,
            player: { select: { id: true, name: true, jersey: true } },
          },
          orderBy: { goal: "desc" },
          take: 5,
        }),
        prisma.player_statistic.findMany({
          select: {
            assist: true,
            player: { select: { id: true, name: true, jersey: true } },
          },
          orderBy: { assist: "desc" },
          take: 5,
        }),
        prisma.player_statistic.findMany({
          select: {
            view: true,
            player: { select: { id: true, name: true, jersey: true } },
          },
          orderBy: { view: "desc" },
          take: 5,
        }),
        prisma.player_statistic.findMany({
          select: {
            match_played: true,
            player: { select: { id: true, name: true, jersey: true } },
          },
          orderBy: { match_played: "desc" },
          take: 5,
        }),
      ]);

    res.json({ topGoalScorers, topAssists, topViewers, topMatchPlayed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed From Prisma" });
  }
};
