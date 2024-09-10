import { Router } from "express";
import {
  authDiscordRedirectController,
  getAuthenticatedDiscordUserController,
} from "../../controllers";

const router = Router();

router.get("/discord/redirect", authDiscordRedirectController);
router.get("/discord/user", getAuthenticatedDiscordUserController);

export default router;
