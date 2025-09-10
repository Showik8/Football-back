import express from "express";
import { getTop5 } from "../controllers/statisticController";
const router = express.Router();

router.get("/", getTop5);

export default router;
