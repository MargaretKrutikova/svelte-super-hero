import axios from "axios"
import {
  SuperHero,
  ApiSearchResultResponse,
  ApiPowerStats,
  PowerStats,
  ApiSuperHero
} from "./Types"

const apiUrl = "https://www.superheroapi.com/api.php/1291558501027144"

const parseStatsValue = (value: string) => {
  const parsedValue = parseInt(value)
  return isNaN(parsedValue) ? null : parsedValue
}

const convertStats = (apiStats: ApiPowerStats): PowerStats => ({
  combat: parseStatsValue(apiStats.combat),
  durability: parseStatsValue(apiStats.durability),
  intelligence: parseStatsValue(apiStats.intelligence),
  power: parseStatsValue(apiStats.power),
  speed: parseStatsValue(apiStats.speed),
  strength: parseStatsValue(apiStats.strength)
})

const convertSuperHero = (apiHero: ApiSuperHero): SuperHero => ({
  id: apiHero.id,
  name: apiHero.name,
  stats: convertStats(apiHero.powerstats),
  biography: apiHero.biography,
  appearance: apiHero.appearance,
  work: apiHero.work,
  connections: apiHero.connections,
  image: apiHero.image
})

export const searchSuperHeroes = async (term: string): Promise<SuperHero[]> => {
  const { data } = await axios.get<ApiSearchResultResponse>(
    `${apiUrl}/search/${term}`
  )
  if (data.response !== "success") {
    return Promise.reject("Unknown error occurred.")
  }

  const heroes: SuperHero[] = data.results.map(convertSuperHero)
  return heroes
}

export const fetchById = async (id: string): Promise<SuperHero> => {
  const { data } = await axios.get<ApiSuperHero>(`${apiUrl}/${id}`)
  if (!data) {
    return Promise.reject("Not found.")
  }
  return convertSuperHero(data)
}

export const fetchByIds = async (ids: string[]): Promise<SuperHero[]> => {
  try {
    const heroes = await Promise.all(ids.map(fetchById))
    return heroes
  } catch {
    return Promise.reject("Not found.")
  }
}
