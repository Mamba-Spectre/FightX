import express from "express";
import { getFightRequests, registerFight,acceptFight } from "../controllers/fights";
import { isAuthenticated } from "../middleware";



const router = express.Router();

router.get('/fightRequests',isAuthenticated,getFightRequests);
router.post('/registerFight',isAuthenticated,registerFight);
router.post('/acceptFight',isAuthenticated,acceptFight);

export default router;