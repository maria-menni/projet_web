export type Category = {
  alias: string
  title: string
}

export type Coordinates = {
  latitude: number
  longitude: number
}

export type Region = {
  center: Coordinates
}

export type Location = {
  address1: string
  address2: string | null
  address3: string | null
  city: string
  country: string
  display_address: string[]
  state: string
  zip_code: string
}

export type Establishment = {
  categories: Category[]
  coordinates: Coordinates
  display_phone: string
  distance: number
  id: string
  image_url: string
  is_closed: boolean
  location: Location
  name: string
  phone: string
  price: string
  rating: number
  review_count: number
  transactions: string[]
  url: string
}

export type Establishments = {
  businesses: Establishment[]
  region: Region
}
