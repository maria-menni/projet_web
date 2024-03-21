import Axios from 'axios'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { Establishments } from '../../types/establishment.ts'

export default class DrinksController {
  async getBarsByLocation({ request, response }: HttpContext) {
    const location = request.input('location')
    const apiKey = env.get('YELP_API_KEY')

    let params: any = {
      location,
      term: 'bar',
      sort_by: 'best_match',
      limit: '20',
    }

    const price = request.input('price', null)
    if (price) {
      params.price = price
    }

    try {
      const yelpResponse = await Axios.get<Establishments>(
        'https://api.yelp.com/v3/businesses/search',
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          params: params,
        }
      )

      return response.json(yelpResponse.data)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Failed to fetch bar from Yelp' })
    }
  }
}
