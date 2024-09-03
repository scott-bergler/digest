import { Router } from "express";
import {
  authDiscordRedirectController,
  getAuthenticatedUserController,
} from "../../controllers";

const router = Router();

router.get("/discord/redirect", authDiscordRedirectController);
router.get("/user", getAuthenticatedUserController);

export default router;
