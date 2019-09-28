import { writable } from "svelte/store"
import { SuperHero } from "./Types"

type BattleState = {
  participants: SuperHero[]
}

const initialState: BattleState = {
  participants: []
}

const hasParticipant = (id: string, state: BattleState) =>
  state.participants.find(h => h.id === id)

const toggleParticipant = (hero: SuperHero, state: BattleState): BattleState =>
  hasParticipant(hero.id, state)
    ? { participants: state.participants.filter(h => h.id !== hero.id) }
    : { participants: [...state.participants, hero] }

const createStore = () => {
  const { subscribe, set, update } = writable<BattleState>(initialState)

  return {
    subscribe,
    // helpers
    hasParticipant,
    hasParticipants: (ids: string[], state: BattleState) =>
      ids.every(id => hasParticipant(id, state)),
    // update actions
    toggleParticipant: (hero: SuperHero) =>
      update(prevState => toggleParticipant(hero, prevState)),
    removeParticipant: (id: string) =>
      update(prevState => ({
        participants: prevState.participants.filter(h => h.id !== id)
      })),
    setParticipants: (participants: SuperHero[]) => set({ participants }),
    resetBattle: () => set({ participants: [] })
  }
}

export const battleStore = createStore()
