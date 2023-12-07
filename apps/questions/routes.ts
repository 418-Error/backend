import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'questions_controller.index').as('questions.index')
      Route.get('/:id', 'questions_controller.show').as('questions.show')

      Route.post('/', 'questions_controller.store').as('questions.store')
      Route.put('/:id', 'questions_controller.update').as('questions.update')
      Route.delete('/:id', 'questions_controller.delete').as('questions.delete')
    }).prefix('questions')
  }).namespace('App/questions/controllers')
}
