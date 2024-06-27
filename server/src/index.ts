import * as dotenv from "dotenv";
import express, { Express, Response, Request } from "express";
import cors from "cors";
import {users} from "./dummy-data"
const app: Express = express();
dotenv.config();
const port = process.env.PORT || 3001;
app.use(cors())
app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Elise!!!");
});
app.get("/users", (req: Request, res: Response) => {
  console.log("USERS", users)
  res.json(users)
})
app.post("/users", (req: Request, res: Response) => {
  const user = req.body
  const userFound = users.find((usr) => usr.email === user.email)
  if (!userFound) {
    users.push(user)
    console.log(users)
    return res.json(user)
  }
  return res.json(userFound)
})

app.listen(port, () => {
  console.info(`Express API server listening on port: ${port}`);
});
