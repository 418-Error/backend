import { inject } from '@adonisjs/fold'
import AnswerService from 'App/questions/services/answer_service'
import { type HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateAnswerValidator } from 'App/questions/validators/answer_validator'

@inject()
export default class AnswersController {
  private answerService = AnswerService
  public async index({ response }: HttpContextContract) {
    const answers = await this.answerService.findAll()

    return response.send(answers)
  }
  public async show({ params, response }: HttpContextContract) {
    const answer = await this.answerService.findById(params.id)

    return response.send(answer)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateAnswerValidator)

    const answer = await this.answerService.createAnswer(data)
    return response.send(answer)
  }
  public async update() {}

  public async vote({ params, response, auth }: HttpContextContract) {
    const answer = await this.answerService.voteByUserId(params.id, auth.user!)

    return response.send(answer)
  }
}
