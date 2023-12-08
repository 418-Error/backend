import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateAnswerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    questionId: schema.string({ trim: true }, [
      rules.exists({ table: 'questions', column: 'id' })
    ]),
    isValid: schema.boolean(),
  })

  public messages: CustomMessages = {}
}

export class UpdateAnwserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    questionId: schema.string.optional({ trim: true }, [
      rules.exists({ table: 'questions', column: 'id' })
    ]),
    isValid: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}

