import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'discord_id'})
    discordId: string

    @Column({ name: 'access_token'})
    accessToken: string

    @Column({ name: 'refresh_token'})
    refreshToken: string
}