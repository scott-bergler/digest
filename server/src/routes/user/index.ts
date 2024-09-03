import { Router, Response, Request } from "express";
import { users } from "../../data/dummy-data"

const router = Router();

router.get("/users", (req: Request, res: Response) => {
  res.json(users)
})
router.post("/users", (req: Request, res: Response) => {
  const user = req.body
  const userFound = users.find((usr) => usr.email === user.email)
  if (!userFound) {
    users.push(user)
    return res.json(user)
  }
  return res.json(userFound)
})

router.get("/profile", async (res: Response, req: Request) => res.send(200));

export default router;
