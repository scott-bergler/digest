import * as dotenv from "dotenv";
import express, { Express, Response, Request } from "express";
import cors from "cors";
import routes from './routes'
import { DataSource } from "typeorm";

dotenv.config();
const port = process.env.PORT || 3000;

async function main() {
  const app: Express = express();
  const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [],
    logging: true,
    synchronize: true,
})
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized")
  }).catch((err) => {
    console.error("This sucks it really really sucks", err)
  })

  app.use(cors())
  app.use(express.json())
  app.use('/api', routes)

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Elise!!!");
  });
  
  app.listen(port, () => {
    console.info(`Express API server listening on port: ${port}`);
  });
}

main();


// // TODO: create redirect callback endpoint
// app.get("/callback", async (req: Request, res: Response) => {
//   console.log("CALLBACK RUN:", req.query)
//   const { code } = req.query
//   if (code) {
//     try {
//       const formData = new url.URLSearchParams({
//         // TODO: Are there issues with declaring the envars as strings? Also, is this casting?
//         client_id: process.env.DISCORD_OAUTH_CLIENT_ID as string,
//         client_secret: process.env.DISCORD_OAUTH_SECRET as string,
//         grant_type: "authorization_code",
//         code: code.toString(),
//         redirect_uri: process.env.DISCORD_REDIRECT_URL as string
//       }) 
//       const response = await axios.post("https://discord.com/api/v8/oauth2/token",
//         formData.toString(),
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//           }
//         }
//       )
//       res.send(response.data)
//       console.log(response.data["access_token"])
//       console.log(response.data["refresh_token"])
//       discordAccessData.accessToken = response.data["access_token"]
//       discordAccessData.refreshToken = response.data["refresh_token"]
//     } catch (error) {
//       console.log(error)
//       res.sendStatus(400)
//     }
//   } else {
//     res.sendStatus(500)
//   }
// })

// // GET USER DATA WITH ACCESS TOKEN HERE
// // Axios GET with headers "Bearer accessToken"
// // Remember to update to a more meaningful url 
// app.get("/exchange", async (req: Request, res: Response)=> {
//   try {
//     const response = await axios.get("https://discord.com/api/v8/users/@me", {
//     headers: {"Authorization":` Bearer ${discordAccessData.accessToken}`}
//   })
//   console.log(response.data)
//   res.send(response.data)
//   } catch(error){
//   console.log(error)
//   res.sendStatus(400)
//   }
  
// })
// // GET REQUEST TO REVOKE ACCESS HERE

// // GET REQUEST TO REFRESH ACCESS TOKEN HERE
// // Grant type "refresh_token"
// // (Not demo-ed in tutorial) so we'll need to figure out when & why to refresh
// // Probably has something to do with sessions

