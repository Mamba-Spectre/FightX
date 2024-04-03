import express from 'express';

import { registerBid, getBids } from '../controllers/biding';

const router = express.Router();

router.post('/registerBid', registerBid);
router.get('/getBids', getBids);

export default router;