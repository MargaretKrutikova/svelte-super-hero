/** api types */
export interface ApiPowerStats {
  intelligence: string
  strength: string
  speed: string
  durability: string
  power: string
  combat: string
}

export interface ApiSuperHero {
  id: string
  name: string
  powerstats: ApiPowerStats
  biography: Biography
  appearance: Appearance
  work: Work
  connections: Connections
  image: Image
}

export interface ApiSearchResultResponse {
  response: string
  "results-for": string
  results: ApiSuperHero[]
}

/** domain types */
export interface Biography {
  "full-name": string
  "alter-egos": string
  aliases: string[]
  "place-of-birth": string
  "first-appearance": string
  publisher: string
  alignment: string
}

export interface Appearance {
  gender: string
  race: string
  height: string[]
  weight: string[]
  "eye-color": string
  "hair-color": string
}

export interface Work {
  occupation: string
  base: string
}

export interface PowerStats {
  intelligence: number | null
  strength: number | null
  speed: number | null
  durability: number | null
  power: number | null
  combat: number | null
}

export interface Connections {
  "group-affiliation": string
  relatives: string
}

export interface Image {
  url: string
}

export interface SuperHero {
  id: string
  name: string
  stats: PowerStats
  biography: Biography
  appearance: Appearance
  work: Work
  connections: Connections
  image: Image
}
