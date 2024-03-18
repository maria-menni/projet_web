export const getRatingClass = (rating: number): string => {
  if (rating < 3.5) return 'text-gray-500'
  if (rating <= 3.8) return 'text-green-300'
  if (rating <= 4.2) return 'text-green-500'
  return 'text-blue-500'
}

export const getRatingText = (rating: number): string => {
  if (rating < 3.5) return ''
  if (rating <= 3.8) return 'good'
  if (rating <= 4.2) return 'fine'
  return 'perfect'
}