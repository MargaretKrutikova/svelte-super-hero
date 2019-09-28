<script>
  export let heroes;
  let className = "";
  export let isVisible;
  export { className as class };

  import { toChart } from "./StatsUtils.ts";
  import { fly, fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { elasticOut, linear } from "svelte/easing";

  let visible = true;

  function grow(node, { duration, delay }) {
    return {
      duration,
      delay,
      css: t => {
        const eased = linear(t);

        return `
          transform: scaleY(${eased});
          transform-origin: bottom;
          `;
      }
    };
  }

  $: chart = toChart(heroes);
</script>

<style>
  .chart {
    height: 320px;
  }
  .bar {
    transition: width 0.5s ease-in-out;
  }
  .group-title {
    transform: rotate(30deg);
  }
  .bar-1 {
    width: 2.3rem;
  }
  .bar-2 {
    width: 1.5rem;
  }
  .bar-3 {
    width: 0.9rem;
  }
  .bar-4 {
    width: 0.7rem;
  }
  @media (min-width: 768px) {
    .bar-1 {
      width: 2.7rem;
    }
    .bar-2 {
      width: 2rem;
    }
    .bar-3 {
      width: 1.4rem;
    }
    .bar-4 {
      width: 1.1rem;
    }
    .group-title {
      transform: none;
    }
  }
</style>

<div class={className}>
  <div class="hero-heading">Power distribution</div>

  <div class="flex flex-col max-w-xl mx-auto">
    <div class="bar-names mt-4">
      {#each Object.values(chart.colors) as color}
        <div class="flex items-center">
          <span
            class="block h-3 w-6 rounded mr-2"
            style="background-color: {color.color}" />
          {color.name}
        </div>
      {/each}
    </div>
    <div class="flex w-full justify-between my-6 max-w-xl md:max-w-2xl">
      {#if isVisible}
        {#each chart.groups as group, index (index)}
          <div
            class="flex flex-col items-center"
            style="width: calc(100%/{chart.groups.length})">
            <div
              class="chart flex items-end flex-auto"
              in:grow={{ duration: 800 }}>
              {#each group.bars as bar}
                <div
                  class={'bar border rounded rounded-b-none bar-' + group.bars.length}
                  style="height:{bar.value}%; background-color: {chart.colors[bar.id].color};"
                  out:grow|local={{ duration: 500 }} />
              {/each}
            </div>
            <div class="font-semibold text-center group-title">
              {group.name}
            </div>
          </div>
        {/each}
      {/if}

    </div>
  </div>
</div>
