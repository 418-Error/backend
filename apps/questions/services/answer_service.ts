import Answer from 'Domains/questions/models/answer'
import User from 'Domains/users/models/user'

interface CreateAnswerDTO {
  name: string
  questionId: string
  isValid: boolean
}

class AnswerService {
  public async findAll() {
    return Answer.query()
  }

  public async findById(answerId: string) {
    return Answer.query()
      .where('id', answerId)
      .preload('users')
      .preload('question')
      .firstOrFail()
  }

  public async findByUserId(userId: string) {
    return Answer.query()
      .whereHas('users', (query) => {
        query.where('id', userId)
      })
  }

  public async createAnswer(data: CreateAnswerDTO): Promise<Answer> {
    const answer = await Answer.create(data)

    return answer
  }

  public async voteByUserId(answerId: string, user: User) {
    const answer = await this.findById(answerId)

    await answer.related('users').create(user)

    return answer
  }
}

export default new AnswerService()
