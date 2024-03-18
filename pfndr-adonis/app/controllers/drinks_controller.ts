import Axios from 'axios'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { Establishments } from '../../types/establishment.ts'

export default class DrinksController {
  async getBarsByLocation({ request, response }: HttpContext) {
    const location = request.input('location')
    const price = request.input('price', '')
    const apiKey = env.get('YELP_API_KEY')

    try {
      const yelpResponse = await Axios.get<Establishments>(
        'https://api.yelp.com/v3/businesses/search',
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          params: {
            location,
            price,
            term: 'bar',
            sort_by: 'best_match',
            limit: '20',
          },
        }
      )

      return response.json(yelpResponse.data)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Failed to fetch bar from Yelp' })
    }
  }
}
