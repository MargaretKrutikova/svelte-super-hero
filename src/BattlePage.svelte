<script>
  /** props */
  export let request;
  export let nav;

  /** declarations */
  import { onMount } from "svelte";
  import { fetchByIds } from "./ApiService.ts";
  import { battleStore } from "./BattleStore.ts";
  import SuperHeroBattle from "./SuperHeroBattle.svelte";

  $: ids =
    request.query && request.query.ids ? request.query.ids.split(",") : [];

  let isLoading;
  onMount(async () => {
    if (battleStore.hasParticipants(ids, $battleStore)) return;

    isLoading = true;
    const participants = await fetchByIds(ids);
    battleStore.setParticipants(participants);

    isLoading = false;
  });
</script>

<div class="flex flex-col antialiased text-gray-900 ">
  <header
    class="flex items-center justify-center relative"
    style="height: 22rem">
    <div class="image-gradient absolute h-full w-full" />
    <div
      class="battle-bg bg-cover w-full bg-center md:bg-center bg-no-repeat
      h-full" />
  </header>
  <main class="container mx-auto">
    {#if isLoading}
      <div class="hero-heading">...Loading</div>
    {:else}
      <div class="hero-heading">Participants:</div>
      <div class="flex flex-wrap justify-center">
        {#each $battleStore.participants as hero}
          <div class="px-4 py-2 flex flex-col items-center">
            <img
              class="border rounded-full h-32 w-32 object-cover mb-3"
              src={hero.image.url}
              alt={hero.name} />
            <h4 class="font-heading text-2xl font-semibold">{hero.name}</h4>
          </div>
        {/each}
      </div>
    {/if}
    <SuperHeroBattle participants={$battleStore.participants} />
  </main>

</div>
