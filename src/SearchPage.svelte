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
    battleStore.participatesInBattle(hero, battleState);

  const handleToggleBattle = event => {
    const hero = event.detail.hero;
    battleStore.toggleParticipant(hero);
  };
</script>

<div class="flex flex-col antialiased text-gray-900">
  <SearchHeader on:search={handleSearch} />
  <a
    href={battleRoute}
    on:click={event => handleInternalLinkClick(nav, battleRoute, event)}>
    Go to battle
  </a>
  <main class="grid grid-template-main">
    <div class="flex flex-col w-full grid-column-main py-5 md:py-10">
      {#await searchResultPromise}
        <div
          class="text-center font-heading text-3xl text-deep-blue-900
          font-semibold">
          ...Loading
        </div>
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
