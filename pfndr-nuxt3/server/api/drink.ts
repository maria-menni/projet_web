import type { Establishments } from '../../../pfndr-adonis/types/establishment.ts'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const location = query.location;
  const price = query.price;
  const config = useRuntimeConfig();
  const drinks: Establishments[] = await $fetch(`${config.API_BASE_URL}drink/${location}`, {
    params: { location, price }
  });
  return drinks;
})
