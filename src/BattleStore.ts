import { writable } from "svelte/store"
import { SuperHero } from "./Types"

type BattleState = {
  participants: SuperHero[]
}

const initialState: BattleState = {
  participants: []
}

const participatesInBattle = (hero: SuperHero, state: BattleState) =>
  state.participants.find(h => h.id === hero.id)

const toggleParticipant = (hero: SuperHero, state: BattleState): BattleState =>
  participatesInBattle(hero, state)
    ? { participants: state.participants.filter(h => h.id !== hero.id) }
    : { participants: [...state.participants, hero] }

const createStore = () => {
  const { subscribe, set, update } = writable<BattleState>(initialState)

  return {
    subscribe,
    participatesInBattle,
    toggleParticipant: (hero: SuperHero) =>
      update(prevState => toggleParticipant(hero, prevState)),
    resetBattle: () => set({ participants: [] })
  }
}

export const battleStore = createStore()
