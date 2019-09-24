<script>
  import SearchHeader from "./SearchHeader.svelte";
  import SuperHeroCard from "./SuperHeroCard.svelte";

  import { searchSuperHeroes } from "./ApiService.ts";

  let searchResultPromise = [];

  const handleSearch = event => {
    searchResultPromise = searchSuperHeroes(event.detail.term);
  };
</script>

<div class="flex flex-col antialiased text-gray-900">
  <SearchHeader on:search={handleSearch} />
  <main class="grid grid-template-main">
    <div class="flex flex-col w-full grid-column-main py-5 md:py-10">
      {#await searchResultPromise}
        <div
          class="text-center font-heading text-3xl text-deep-blue-900
          font-semibold">
          ...Loading
        </div>
      {:then heroes}
        {#each heroes as superHero}
          <SuperHeroCard {superHero} />
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
