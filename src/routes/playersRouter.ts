import express from "express";
import { getPlayerId } from "../controllers/playersController";
const router = express.Router();

router.get("/:id", getPlayerId);

export default router;
