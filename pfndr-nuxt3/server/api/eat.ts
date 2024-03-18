import type { Establishments } from '../../../pfndr-adonis/types/establishment.ts'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const location = query.location;
  const price = query.price;
  const eats: Establishments[] = await $fetch(`http://localhost:3333/api/eat/${location}`, {
    params: { location, price }
  });
  return eats;
})
