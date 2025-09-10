import type { Request, Response } from "express";
import { tournaments } from "../constants";

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
