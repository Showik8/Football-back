import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPlayerById(req: Request, res: Response) {
  const ID = Number(req.params.id);
  const player = await prisma.player.findUnique({
    where: { id: ID },
    include: {
      statistics: true,
      team_players: {
        select: { team: { select: { name: true } } },
      },
    },
  });

  if (!player) {
    throw new Error("Player not found");
  }

  const { statistics, team_players, ...rest } = player;
  const statistic = statistics[0];
  const team = team_players[0].team.name;
  const dab = player?.date_of_birth.getFullYear();
  const today = new Date();
  const age = today.getFullYear() - dab!;

  const respons = { ...statistic, team, age, ...rest };

  res.send(respons);
}

export { getPlayerById };
