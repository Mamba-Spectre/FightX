import express from "express";
import { getFightRequests, registerFight,acceptFight } from "../controllers/fights";



const router = express.Router();

router.get('/fightRequests',getFightRequests);
router.post('/registerFight',registerFight);
router.post('/acceptFight',acceptFight);

export default router;