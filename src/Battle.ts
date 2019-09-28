import { SuperHero, PowerStats } from "./Types"

type SuperHeroScore = {
  score: number
  id: string
}

type BattleResult = {
  rankedScores: SuperHeroScore[]
  insufficientDataIds: string[]
}

const MISSING_DATA_MAX_COUNT = 2

const statsValue = (value: number | null) =>
  value === null ? 0 : Math.pow(value, 2)

const calculateScore = (stats: PowerStats) =>
  Math.sqrt(
    statsValue(stats.combat) +
      statsValue(stats.durability) +
      statsValue(stats.intelligence) +
      statsValue(stats.power) +
      statsValue(stats.speed) +
      statsValue(stats.strength)
  )

type Seed = {
  insufficientDataIds: string[]
  scores: { score: number; id: string }[]
}

export const fight = (heroes: SuperHero[]): BattleResult => {
  const seed: Seed = {
    insufficientDataIds: [],
    scores: []
  }
  const result = heroes.reduce((acc, hero) => {
    const hasInsufficientData =
      Object.keys(hero.stats).filter(key => hero.stats[key] === null).length >
      MISSING_DATA_MAX_COUNT

    if (hasInsufficientData) {
      acc.insufficientDataIds.push(hero.id)
    } else {
      const heroScore = {
        score: calculateScore(hero.stats),
        id: hero.id
      }
      acc.scores.push(heroScore)
    }

    return acc
  }, seed)

  const rankedScores = seed.scores
    .slice()
    .sort((left, right) => right.score - left.score)

  return { insufficientDataIds: result.insufficientDataIds, rankedScores }
}
