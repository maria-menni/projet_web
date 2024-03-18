import type { Establishments } from '../../../pfndr-adonis/types/establishment.ts'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const location = query.location;
  const price = query.price;
  const drinks: Establishments[] = await $fetch(`http://localhost:3333/api/drink/${location}`, {
    params: { location, price }
  });
  return drinks;
})
