import axios from "axios"
import {
  SuperHero,
  ApiSearchResultResponse,
  ApiPowerStats,
  PowerStats
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

export const searchSuperHeroes = async (term: string): Promise<SuperHero[]> => {
  const { data } = await axios.get<ApiSearchResultResponse>(
    `${apiUrl}/search/${term}`
  )
  if (data.response !== "success") {
    return Promise.reject("Unknown error occurred.")
  }

  const heroes: SuperHero[] = data.results.map(hero => ({
    id: hero.id,
    name: hero.name,
    stats: convertStats(hero.powerstats),
    biography: hero.biography,
    appearance: hero.appearance,
    work: hero.work,
    connections: hero.connections,
    image: hero.image
  }))

  return heroes
}
