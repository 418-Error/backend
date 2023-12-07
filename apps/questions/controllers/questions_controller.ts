import { type HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QuestionService from 'App/questions/services/question_service'

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
}
