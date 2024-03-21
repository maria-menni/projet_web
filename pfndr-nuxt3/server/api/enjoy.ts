import type { Establishments } from '../../../pfndr-adonis/types/establishment.ts'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const location = query.location;
  const price = query.price;
  const config = useRuntimeConfig();
  const events: Establishments[] = await $fetch(`${config.API_BASE_URL}enjoy/${location}`, {
    params: { location }
  });
  return events;
})
