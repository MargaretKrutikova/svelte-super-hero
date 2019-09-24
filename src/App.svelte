<script lang="ts">
  import SearchField from "./SearchField.svelte";
  import SuperHeroCard from "./SuperHeroCard.svelte";

  import { searchSuperHeroes } from "./ApiService.ts";

  let searchResultPromise = Promise.resolve([]);

  const handleSearch = event => {
    searchResultPromise = searchSuperHeroes(event.detail.term);
  };
</script>

<div class="bg-gray-100 flex flex-col antialiased text-gray-900">
  <header class="h-16 bg-deep-purple flex items-center justify-center">
    <h1 class="font-bold text-3xl font-body text-white text-lg">
      Super heroes
    </h1>
  </header>
  <main class="grid grid-template-main">
    <div
      class="my-10 md:flex justify-between items-center grid-column-main
      sm:w-full lg:w-1/2 mx-auto">
      <SearchField on:search={handleSearch} />
    </div>
    {#await searchResultPromise}
      ...loading
    {:then results}
      <div class="flex flex-col w-full grid-column-main">
        {#each results as superHero}
          <SuperHeroCard {superHero} />
        {/each}
      </div>

    {:catch error}
      Sorry!
    {/await}
  </main>
</div>
