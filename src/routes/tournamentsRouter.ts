import express from "express";
import { getTournaments } from "../controllers/tournamentsController";
const router = express.Router();

router.get("/", getTournaments);

export default router;
