import axios from "axios"
import { SearchResult } from "./Types"

const apiUrl = "https://www.superheroapi.com/api.php/1291558501027144"

export const searchSuperHeroes = async (term: string) => {
  const { data } = await axios.get<SearchResult>(`${apiUrl}/search/${term}`)
  if (data.response !== "success") {
    return Promise.reject("Unknown error occurred.")
  }

  return data.results
}
