import type { Request, Response } from "express";
import { tournaments } from "../constants";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// Example http://localhost:8888/api/tournaments?ageCategory=u-19&tournament=imereti

export const getTournaments = (req: Request, res: Response) => {
  const ageCategory = req.query.ageCategory as string;
  const nameOfTournament = req.query.tournament as string;

  const tournament = tournaments.find(
    (t) => t.name === nameOfTournament && t.age === ageCategory
  );

  if (!tournament)
    return res.status(404).json({ message: "Not found", teams: [] });

  res.json(tournament.teams);
};

// export async function getTournaments(_req: Request, res: Response) {
//   const tour = await prisma.tournament.findMany({
//     include: {
//       team_tournaments: {
//         select: {
//           team: { select: { name: true, age_category: true } },
//           completed_matches: true,
//           won: true,
//           drawn: true,
//           lost: true,
//           goals_for: true,
//           goals_against: true,
//           goal_difference: true,
//           points: true,
//         },
//       },
//     },
//   });
//   res.json(tour);
// }
