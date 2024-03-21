import type { Establishments } from '../../../pfndr-adonis/types/establishment.ts'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const location = query.location;
  const price = query.price;
  const config = useRuntimeConfig();
  const eats: Establishments[] = await $fetch(`${config.API_BASE_URL}eat/${location}`, {
    params: { location, price }
  });
  return eats;
})
