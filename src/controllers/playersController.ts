import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPlayerById(req: Request, res: Response) {
  const ID = Number(req.params.id);
  const player = await prisma.players.findUnique({
    where: { id: ID },
  });
  res.send(player);
}

export { getPlayerById };
