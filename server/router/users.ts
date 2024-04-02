import express from "express";
import { searchUser } from "../controllers/users";

const router = express.Router();

router.get('/',searchUser);


export default router;