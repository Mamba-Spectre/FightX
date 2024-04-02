import express from "express";
import authentication from "./authentication";
import users from "./users";
import fights from "./fights";

const router = express.Router();

router.use("/auth",authentication);
router.use("/user",users);
router.use("/fights",fights);

export default router;