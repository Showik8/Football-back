import { Router } from "express";
import { getMatches } from "../controllers/matchesController";

const router = Router();

router.get("/", getMatches);

export default router;
