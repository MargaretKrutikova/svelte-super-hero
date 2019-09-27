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

<style>
  .btn {
    transition: all 0.15s ease-in-out;
  }
</style>

<div>
  {#if rankedHeroes === null}
    <button
      on:click={calculateScore}
      class="btn bg-deep-blue-500 hover:bg-deep-blue-700 text-white font-bold
      py-2 px-4 rounded">
      Let the fight begin!
    </button>
  {:else}
    {#each rankedHeroes as rank (rank.hero.id)}
      <div>{rank.hero.name} with score {rank.score}</div>
    {/each}
  {/if}
</div>
