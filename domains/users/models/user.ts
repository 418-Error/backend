import { DateTime } from 'luxon'
import { column, BaseModel, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Answer from 'Domains/questions/models/answer'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public username: string

  @column()
  public isAdmin: boolean

  @column()
  public rememberMeToken: string | null

  @column()
  public accessToken: string | null

  @column()
  public avatarUrl: string | null

  @column()
  public isVerified: boolean
  
  @manyToMany(() => Answer)
  public answers: ManyToMany<typeof Answer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(model: User) {
    model.id = randomUUID()
  }
}
