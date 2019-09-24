<script>
  import SearchHeader from "./SearchHeader.svelte";
  import SuperHeroCard from "./SuperHeroCard.svelte";

  import { searchSuperHeroes } from "./ApiService.ts";

  let searchResultPromise = Promise.resolve([]);

  const handleSearch = event => {
    searchResultPromise = searchSuperHeroes(event.detail.term);
  };
</script>

<div class="bg-gray-100 flex flex-col antialiased text-gray-900">
  <SearchHeader on:search={handleSearch} />
  <main class="grid grid-template-main">
    <div
      class="my-8 md:flex justify-between items-center grid-column-main
      sm:w-full lg:w-1/2 mx-auto flex flex-col" />
    {#await searchResultPromise}
      ...loading
    {:then heroes}
      <div class="flex flex-col w-full grid-column-main">
        {#each heroes as superHero}
          <SuperHeroCard {superHero} />
        {/each}
      </div>

    {:catch error}
      Sorry!
    {/await}
  </main>
</div>
