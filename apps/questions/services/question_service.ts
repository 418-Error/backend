import Question from 'Domains/questions/models/question'

interface CreateQuestionDTO {
  name: string
  description: string
}

interface UpdateQuestionDTO {
  name?: string
  description?: string
}

class QuestionService {
  public async findAll(): Promise<Question[]> {
    return Question.query()
      .preload('answers')
  }

  public async findById(questionId: string): Promise<Question> {
    return Question.query()
      .where('id', questionId)
      .preload('answers')
      .firstOrFail()
  }

  public async createQuestion(data: CreateQuestionDTO): Promise<Question> {
    return Question.create(data)
  }

  public async updateById(questionId: string, data: UpdateQuestionDTO): Promise<Question> {
    const question = await this.findById(questionId)

    await question.merge(data).save()

    return question
  }

  public async deleteById(questionId: string): Promise<Question> {
    const question = await this.findById(questionId)

    await question.delete()

    return question
  }
}

export default new QuestionService()
