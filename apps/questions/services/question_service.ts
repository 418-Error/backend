import Question from 'Domains/questions/models/question'

class QuestionService {
  public async findAll(): Promise<Question[]> {
    return Question.query()
  }

  public async findById(questionId: string): Promise<Question> {
    return Question.query()
      .where('id', questionId)
      .preload('answers')
      .firstOrFail()
  }
}

export default new QuestionService()
