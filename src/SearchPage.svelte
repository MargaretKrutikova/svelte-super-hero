<script>
  /** props */
  export let request;
  export let nav;

  /** declarations */
  import { searchSuperHeroes } from "./ApiService.ts";
  import { battleStore } from "./BattleStore.ts";
  import { handleInternalLinkClick, createBattleRoute } from "./Routing.ts";
  import SearchHeader from "./SearchHeader.svelte";
  import SuperHeroCard from "./SuperHeroCard.svelte";

  let searchResultPromise = [];
  const handleSearch = event => {
    searchResultPromise = searchSuperHeroes(event.detail.term);
  };

  $: battleRoute = createBattleRoute($battleStore.participants.map(p => p.id));
  const isInBattle = (hero, battleState) =>
    battleStore.hasParticipant(hero.id, battleState);

  const handleToggleBattle = event => {
    const hero = event.detail.hero;
    battleStore.toggleParticipant(hero);
  };
</script>

<div class="flex flex-col antialiased text-gray-900">
  <SearchHeader on:search={handleSearch} />
  {#if $battleStore.participants.length > 1}
    <div class="flex items-center justify-center my-3">
      <a
        href={battleRoute}
        class="text-deep-blue-500 hover:text-deep-blue-800 text-3xl font-heading
        font-semibold"
        on:click={event => handleInternalLinkClick(nav, battleRoute, event)}>
        Go to battle
      </a>
    </div>
  {/if}
  <main class="grid grid-template-main">
    <div class="flex flex-col w-full grid-column-main py-5 md:py-10">
      {#await searchResultPromise}
        <div class="hero-heading">...Loading</div>
      {:then heroes}
        {#each heroes as hero}
          <SuperHeroCard
            {hero}
            participatesInBattle={isInBattle(hero, $battleStore)}
            on:toggleBattle={handleToggleBattle} />
        {/each}
      {:catch error}
        <div
          class="text-center font-heading text-3xl text-red-800 font-semibold">
          Not Found!
        </div>
      {/await}
    </div>
  </main>
</div>
