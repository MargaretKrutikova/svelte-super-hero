<script>
  import { searchSuperHeroes } from "./ApiService.ts";
  import SearchHeader from "./SearchHeader.svelte";
  import SuperHeroCard from "./SuperHeroCard.svelte";
  import SuperHeroBattle from "./SuperHeroBattle.svelte";

  let searchResultPromise = [];
  const handleSearch = event => {
    searchResultPromise = searchSuperHeroes(event.detail.term);
  };

  let battleHeroesMap = {};
  $: battleParticipants = Object.values(battleHeroesMap);

  function participatesInBattle(id) {
    return !!battleHeroesMap[id];
  }

  function handleToggleBattle(event) {
    const hero = event.detail.hero;

    if (participatesInBattle(hero.id)) {
      const { [hero.id]: _, ...rest } = battleHeroesMap;
      battleHeroesMap = rest; // reactivity ...
    } else {
      battleHeroesMap = { ...battleHeroesMap, [hero.id]: hero }; // same ...
    }
  }
</script>

<div class="flex flex-col antialiased text-gray-900">
  <SearchHeader on:search={handleSearch} />
  <SuperHeroBattle participants={battleParticipants} />
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
            participatesInBattle={!!battleHeroesMap[hero.id]}
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
