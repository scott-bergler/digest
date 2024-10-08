import { Router, Response, Request } from "express";
import { users } from "../../data/dummy-data"
import { userLoginController } from "../../controllers";

const router = Router();

router.get("/users", (req: Request, res: Response) => {
  res.json(users)
})

router.post("/users", userLoginController)

router.get("/profile", async (res: Response, req: Request) => res.send(200));

export default router;
