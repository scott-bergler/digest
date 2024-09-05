import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
@Entity({name: 'discord_users'})
export class DiscordUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'discord_id', unique: true})
    discordId: string

    @Column({ name: 'access_token'})
    accessToken: string

    @Column({ name: 'refresh_token'})
    refreshToken: string
}

//client side entity 
@Entity({name: 'users'})
export class AppUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'email'})
    email: string

    @Column({ name: 'full_name'})
    full_name: string

    @Column({name: 'google_id'})
    google_id: string
}