import { DateTime } from 'luxon'
import { column, BaseModel, beforeCreate, BelongsTo, belongsTo, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Question from 'Domains/questions/models/question'
import User from 'Domains/users/models/user'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public questionId: string

  @column()
  public isValid: boolean

  @belongsTo(() => Question)
  public question: BelongsTo<typeof Question>

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(model: Answer) {
    model.id = randomUUID()
  }
}
