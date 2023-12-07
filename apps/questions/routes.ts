import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'questions_controller.index').as('questions.index')
    }).prefix('questions')
  }).namespace('App/questions/controllers')
}
