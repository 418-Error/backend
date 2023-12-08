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

  public async create ({ request, response, auth }: HttpContextContract) {
    const user = auth.user as User

    if (!user.isAdmin) {
      return response.unauthorized()
    }
    const name = request.input('name')
    const description = request.input('description')
    const answer_one = request.input('answer_one')
    const answer_two = request.input('answer_two')

    const question = await Question.create({
      name: name,
      description: description,
      isActive: true
    })

    const answerOne = await Answer.create({
      name: answer_one,
      isValid: true,
      questionId: question.id,
    })

    const answerTwo = await Answer.create({
      name: answer_two,
      isValid: false,
      questionId: question.id,
    })

    return response.send({
      question, answerOne, answerTwo
    })
  }

  public async unanswered({ response, auth }: HttpContextContract) {
    const user = auth.user as User

    const t = await Answer.query()
      .whereHas('users', (query) => {
        query.where('users.id', user.id)
      })

    const ids = t.map((item) => item.questionId)

    const question = await Question.query()
      .where('is_active', true)
      .whereNotIn('id', ids)
      .has('answers', '=', 2)
      .preload('answers')
      .first()

    if (!question) {
      return response.badRequest({
        message: "no question found for this user"
      })
    }



    return response.send(question)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(CreateQuestionValidator)
    const user = auth.user as User

    if (!user.isAdmin) {
      return response.unauthorized()
    }

    const question = await this.questionService.createQuestion(data)

    return response.send(question)
  }

  public async update({ request, params, response, auth }: HttpContextContract) {
    const data = await request.validate(UpdateQuestionValidator)
    const user = auth.user as User

    if (!user.isAdmin) {
      return response.unauthorized()
    }
    const question = await this.questionService.updateById(params.id, data)

    return response.send(question)
  }

  public async delete({ params, response, auth }: HttpContextContract) {
    const user = auth.user as User

    if (!user.isAdmin) {
      return response.unauthorized()
    }
    const question = await this.questionService.deleteById(params.id)

    return response.send(question)
  }
}
