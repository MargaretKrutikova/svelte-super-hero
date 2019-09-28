<script>
  /** props */
  export let request;
  export let nav;

  /** declarations */
  import { onMount, afterUpdate } from "svelte";
  import { flip } from "svelte/animate";
  import { fade, fly } from "svelte/transition";

  import { fetchByIds } from "./ApiService.ts";
  import { buildObserverThresholdList } from "./Utils.ts";
  import { battleStore } from "./BattleStore.ts";
  import { fight } from "./Battle.ts";
  import StatsComparison from "./StatsComparison.svelte";

  $: ids =
    request.query && request.query.ids ? request.query.ids.split(",") : [];

  let isLoading;
  let winner = null;
  $: if ($battleStore.participants.length > 0) {
    winner = getWinner();
  } else {
    winner = null;
  }

  const getWinner = () => {
    const result = fight($battleStore.participants);
    const firstPlace = result.rankedScores[0];

    return $battleStore.participants.find(hero => hero.id === firstPlace.id);
  };

  const isWinner = hero => (winner ? winner.id === hero.id : false);

  onMount(async () => {
    if (battleStore.hasParticipants(ids, $battleStore)) return;

    isLoading = true;
    const participants = await fetchByIds(ids);
    battleStore.setParticipants(participants);

    isLoading = false;
  });

  let isVisibleComparisonChart = false;
  let hasInitializedObserver = false;
  afterUpdate(() => {
    if (hasInitializedObserver) return;
    const callback = function(entries) {
      const entry = entries[0];
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        isVisibleComparisonChart = true;
      }
    };

    let options = {
      threshold: buildObserverThresholdList(20)
    };

    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector(".comparison-chart");
    if (target) {
      observer.observe(target);
      hasInitializedObserver = true;
    }
  });
</script>

<div class="flex flex-col antialiased text-gray-900 ">
  <header
    class="flex items-center h-12 md:h-16 justify-center bg-deep-blue-100
    border-deep-blue-400 border-b">
    <div class="uppercase font-bold font-heading text-2xl text-deep-blue-900">
      Superhero battle
    </div>

  </header>
  <main class="container mx-auto px-5 py-5">
    {#if isLoading}
      <div class="hero-heading">...Loading</div>
    {:else}
      {#if winner}
        <div class="hero-heading">{winner.name} wins</div>
      {/if}
      <div class="flex flex-wrap items-center justify-center heroes-container">
        {#each $battleStore.participants as hero (hero.id)}
          <div
            class="px-4 py-2 flex flex-col items-center"
            in:fade
            animate:flip>
            <img
              class={'border rounded-full h-32 w-32 object-cover mb-3 ' + (isWinner(hero) ? 'h-48 w-48' : '')}
              src={hero.image.url}
              alt={hero.name} />
            <h4 class="font-heading text-2xl font-semibold">
              {hero.name} {isWinner(hero) ? ' (winner)' : ''}
            </h4>
            <button on:click={() => battleStore.removeParticipant(hero.id)}>
              Remove
            </button>
          </div>
        {/each}
      </div>

      {#if $battleStore.participants.length > 0}
        <StatsComparison
          class="comparison-chart"
          isVisible={isVisibleComparisonChart}
          heroes={$battleStore.participants} />
      {/if}
    {/if}
  </main>
</div>
