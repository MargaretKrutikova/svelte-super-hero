<script>
  import SearchField from "./SearchField.svelte";

  export let onSearch;
</script>

<header class="flex items-center justify-center relative" style="height: 30rem">
  <div class="image-gradient absolute h-full w-full" />
  <div
    class="search-bg bg-cover w-full bg-left-bottom md:bg-center bg-no-repeat
    h-full" />
  <div class="absolute bottom-0 mb-8 lg:mb-12 w-full px-5 lg:w-auto">
    <h1
      class="big-header text-white tracking-wide font-bold mb-3 text-4xl
      sm:text-5xl md:text-6xl font-heading uppercase">
      Who is your favorite?
    </h1>
    <SearchField on:search={onSearch} />
  </div>
</header>
