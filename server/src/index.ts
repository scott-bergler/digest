import * as dotenv from "dotenv";
import express, { Express, Response, Request } from "express";
import cors from "cors";
import routes from './routes'

dotenv.config();
const port = process.env.PORT || 3001;

async function main() {
  const app: Express = express();
  
  try {
    app.use(cors())
    app.use(express.json())
    app.use('/api', routes)

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello, Elise!!!");
    });
    
    app.listen(port, () => {
      console.info(`Express API server listening on port: ${port}`);
    });
  } catch (err) {
    console.error("App setup in src/index failed.", err)
  }
}

main();