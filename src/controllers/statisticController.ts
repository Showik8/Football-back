import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTop5 = async (_req: Request, res: Response) => {
  const topGoalScorers = await prisma.players.findMany({
    select: { id: true, name: true, jersey: true, goal: true },
    orderBy: { goal: "desc" },
    take: 5,
  });
  const topAssists = await prisma.players.findMany({
    select: { id: true, name: true, jersey: true, assist: true },
    orderBy: { assist: "desc" },
    take: 5,
  });
  const topViewers = await prisma.players.findMany({
    select: { id: true, name: true, jersey: true, view: true },
    orderBy: { view: "desc" },
    take: 5,
  });
  const topMatchPlayed = await prisma.players.findMany({
    select: { id: true, name: true, jersey: true, matchPlayed: true },
    orderBy: { matchPlayed: "desc" },
    take: 5,
  });

  res.send({ topGoalScorers, topAssists, topViewers, topMatchPlayed });
};
