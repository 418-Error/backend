import { type HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QuestionService from 'App/questions/services/question_service'
import { CreateQuestionValidator, UpdateQuestionValidator } from 'App/questions/validators/question_validator'
import { inject } from '@adonisjs/fold'
import Question from 'Domains/questions/models/question'
import User from 'Domains/users/models/user'
import Answer from 'Domains/questions/models/answer'

@inject()
export default class QuestionsController {
  private questionService = QuestionService
  public async index({ response }: HttpContextContract) {
    const questions = await this.questionService.findAll()

    return response.send(questions)
  }

  public async show ({ params, response }: HttpContextContract){
    const question = await this.questionService.findById(params.id)

    return response.send(question)
  }

  public async unanswered({ response, auth }: HttpContextContract) {
    const user = auth.user as User

    const t = await Answer.query()
      .whereHas('users', (query) => {
        query.where('users.id', user.id)
      })

    const ids = t.map((item) => item.questionId)

    const questions = await Question.query()
      .where('is_active', true)
      .whereNotIn('id', ids)


    return response.send(questions)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateQuestionValidator)

    const question = await this.questionService.createQuestion(data)

    return response.send(question)
  }

  public async update({ request, params, response }: HttpContextContract) {
    const data = await request.validate(UpdateQuestionValidator)
    const question = await this.questionService.updateById(params.id, data)

    return response.send(question)
  }

  public async delete({ params, response }: HttpContextContract) {
    const question = await this.questionService.deleteById(params.id)

    return response.send(question)
  }
}
