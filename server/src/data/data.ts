import * as dotenv from "dotenv";
import { DataSource } from 'typeorm'
import { DiscordUser } from './entities'
dotenv.config();

const mysqlDS = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [DiscordUser],
  logging: true,
  synchronize: true,
})

mysqlDS
    .initialize()
    .then((ds) => {
        console.log("Data Source has been initialized!")
        return ds
    })
    .catch((error) => {
        console.error("Error during Data Source initialization:", error)
    })

export const userRepo = mysqlDS.getRepository(DiscordUser)