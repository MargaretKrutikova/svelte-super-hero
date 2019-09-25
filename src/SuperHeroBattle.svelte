<script>
  import { fight } from "./Battle.ts";

  /** props */
  export let participants;

  /** declarations */
  let rankedHeroes = null;
  function calculateScore() {
    const result = fight(participants);

    rankedHeroes = result.rankedScores.map(({ id, score }) => ({
      score,
      hero: participants.find(hero => hero.id === id)
    }));
  }
</script>

<div>
  <h3>Participants:</h3>
  <ul>
    {#each participants as superHero}
      <li>{superHero.name}</li>
    {/each}
  </ul>
  {#if rankedHeroes === null}
    <button on:click={calculateScore}>Let the fight begin!</button>
  {:else}
    {#each rankedHeroes as rank (rank.hero.id)}
      <div>{rank.hero.name} with score {rank.score}</div>
    {/each}
  {/if}
</div>
