<script>
  import { createEventDispatcher } from "svelte";
  import PowerScore from "./PowerScore.svelte";

  /** props */
  export let hero;
  export let participatesInBattle;

  /** events */
  const dispatch = createEventDispatcher();
  function toggleBattleParticipation() {
    dispatch("toggleBattle", { hero });
  }

  /** declarations */
  let appearance = hero.biography["first-appearance"];
</script>

<div
  class="bg-white rounded-lg relative max-width-4 overflow-hidden border grid
  grid-template-card mb-6 lg:mb-10">
  <div class="hidden md:block w-auto h-auto">
    <div
      style="background-image: url('{hero.image.url}')"
      class="bg-cover h-full w-full bg-center" />
  </div>
  <div class="px-6 pt-2 pb-3 w-full flex flex-col items-center md:items-start">
    <h4 class="font-bold text-deep-blue-base font-heading text-4xl">
      {hero.name}
    </h4>
    <button on:click={toggleBattleParticipation}>
      {#if participatesInBattle}Remove from battle{:else}Add to battle{/if}
    </button>
    <span class="mb-2 block">{hero.biography['full-name']}</span>

    <img
      class="md:hidden border rounded-full h-48 w-48 object-cover mb-3"
      src={hero.image.url}
      alt={hero.name} />

    <div
      class="flex flex-col w-full mx-auto md:mx-0 max-w-md lg:w-full mb-2
      self-stretch">
      <PowerScore name="Intelligence" score={hero.stats.intelligence} />
      <PowerScore name="Strength" score={hero.stats.strength} />
      <PowerScore name="Speed" score={hero.stats.speed} />
      <PowerScore name="Durability" score={hero.stats.durability} />
      <PowerScore name="Power" score={hero.stats.power} />
      <PowerScore name="Combat" score={hero.stats.combat} />
    </div>
    {#if appearance !== '-'}
      <div class="break-word text-center md:text-left">
        <span class="block text-gray-600">First appearence:</span>
        <span class="font-semibold text-gray-800">
          {hero.biography['first-appearance']} by
          <span class="text-deep-blue-400">{hero.biography['publisher']}</span>
        </span>
      </div>
    {/if}
  </div>
</div>
