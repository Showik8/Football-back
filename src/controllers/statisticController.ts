import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTop5 = async (_req: Request, res: Response) => {
  try {
    const [topGoalScorers, topAssists, topViewers, topMatchPlayed] =
      await Promise.all([
        prisma.playerStatistic.findMany({
          select: {
            goals: true,
            player: {
              select: { id: true, name: true, jersey: true, position: true },
            },
          },
          orderBy: { goals: "desc" },
          take: 5,
        }),
        prisma.playerStatistic.findMany({
          select: {
            assists: true,
            player: {
              select: { id: true, name: true, jersey: true, position: true },
            },
          },
          orderBy: { assists: "desc" },
          take: 5,
        }),
        prisma.playerStatistic.findMany({
          select: {
            views: true,
            player: {
              select: { id: true, name: true, jersey: true, position: true },
            },
          },
          orderBy: { views: "desc" },
          take: 5,
        }),
        prisma.playerStatistic.findMany({
          select: {
            matches_played: true,
            player: {
              select: { id: true, name: true, jersey: true, position: true },
            },
          },
          orderBy: { matches_played: "desc" },
          take: 5,
        }),
      ]);

    res.json({ topGoalScorers, topAssists, topViewers, topMatchPlayed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed From Prisma" });
  }
};
