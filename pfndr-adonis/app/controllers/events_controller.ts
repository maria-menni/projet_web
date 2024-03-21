import Axios from 'axios'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { Establishments } from '../../types/establishment.ts'

export default class EventsController {
  async getEventsByLocation({ request, response }: HttpContext) {
    const location = request.input('location')
    const apiKey = env.get('PREDICT_API_KEY')

    let params: any = {
      q: location,
    }

    try {
      const predictResponse = await Axios.get<Establishments>(
        'https://api.predicthq.com/v1/events',
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          params: params,
        }
      )

      return response.json(predictResponse.data)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Failed to fetch food from Predict' })
    }
  }
}
