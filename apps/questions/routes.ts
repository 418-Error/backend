import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'questions_controller.index').as('questions.index')
      Route.get('/unanswered', 'questions_controller.unanswered').as('questions.unanswered')
      Route.get('/:id', 'questions_controller.show').as('questions.show')

      Route.post('/create', 'questions_controller.create').as('questions.create')
      Route.post('/', 'questions_controller.store').as('questions.store')
      Route.put('/:id', 'questions_controller.update').as('questions.update')
      Route.delete('/:id', 'questions_controller.delete').as('questions.delete')
    }).prefix('questions')

    Route.group(() => {
      Route.get('/', 'answers_controller.index').as('answers.index')
      Route.get('/:id', 'answers_controller.show').as('answers.show')

      Route.post('/', 'answers_controller.store').as('answer.store')
      Route.post('/:id/vote', 'answers_controller.vote').as('answers.vote')
      Route.put('/:id', 'answers_controller.update').as('answer.update')
    }).prefix('/answers')
  }).namespace('App/questions/controllers').middleware('auth')
}
