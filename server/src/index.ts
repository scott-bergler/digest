import * as dotenv from "dotenv";
import express, { Express, Response, Request } from "express";
const app: Express = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Elise!!!");
});

app.listen(port, () => {
  console.info(`Express API server listening on port: ${port}`);
});
