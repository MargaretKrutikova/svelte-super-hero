<script lang="ts">
  import SearchField from "./SearchField.svelte";
  import { searchSuperHeroes } from "./ApiService.ts";

  export let name;

  let searchResults = [];
  const handleSearch = async event => {
    searchResults = await searchSuperHeroes(event.detail.term);
    console.log(searchResults);
  };
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<main>
  <h1>Hello {name}!</h1>
  <SearchField on:search={handleSearch} />
</main>
