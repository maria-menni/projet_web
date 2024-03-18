/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const EatsController = () => import('#controllers/eats_controller')
const DrinksController = () => import('#controllers/drinks_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('/enjoy/:location', ({ params }) => {
      return `Fetching events and activities for location: ${params.location}`
    })

    router.get('/sleep/:location', ({ params }) => {
      return `Fetching accommodations for location: ${params.location}`
    })

    router.get('/travel/:location', ({ params }) => {
      return `Fetching transport options for location: ${params.location}`
    })

    router.get('/eat/:location', [EatsController, 'getRestaurantsByLocation'])

    router.get('/drink/:location', [DrinksController, 'getBarsByLocation'])
  })
  .prefix('/api')
