import { SuperHero } from "./Types"

const barColors = ["#2A75B3", "#CC4224", "#F3D403", "#6F3C89"]

type ChartBar = {
  value: number
  name: string
  id: string
}

type ChartGroup = {
  name: string
  bars: ChartBar[]
}

type HeroColors = {
  [key: string]: {
    name: string
    color: string
  }
}

const sortByValue = (bars: ChartBar[]) =>
  bars.slice().sort((l, r) => r.value - l.value)

type Chart = {
  groups: ChartGroup[]
  colors: HeroColors
}

export const toChart = (heroes: SuperHero[]): Chart => {
  if (!heroes || heroes.length === 0)
    return {
      groups: [],
      colors: {}
    }

  const colors = heroes.reduce(
    (acc, hero, ind) => ({
      ...acc,
      [hero.id]: {
        color: barColors[ind],
        name: hero.name
      }
    }),
    {}
  )

  const groups = [
    {
      name: "Brain",
      bars: heroes.map(s => ({
        id: s.id,
        name: s.name,
        value: s.stats.intelligence
      }))
    },
    {
      name: "Strength",
      bars: heroes.map(s => ({
        id: s.id,
        name: s.name,
        value: s.stats.strength
      }))
    },
    {
      name: "Speed",
      bars: heroes.map(s => ({
        id: s.id,
        name: s.name,
        value: s.stats.speed
      }))
    },
    {
      name: "Durability",
      bars: heroes.map(s => ({
        id: s.id,
        name: s.name,
        value: s.stats.durability
      }))
    },
    {
      name: "Power",
      bars: heroes.map(s => ({
        id: s.id,
        name: s.name,
        value: s.stats.power
      }))
    },
    {
      name: "Combat",
      bars: heroes.map(s => ({
        id: s.id,
        name: s.name,
        value: s.stats.combat
      }))
    }
  ]

  return {
    groups: groups.map(g => ({ ...g, bars: sortByValue(g.bars) })),
    colors
  }
}
