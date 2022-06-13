import { Router } from "express";
import rankingRouter from "./rankingRouter.js";
import urlsRouter from "./urlsRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router.use(rankingRouter);
router.use(urlsRouter);
router.use(usersRouter);

export default router;