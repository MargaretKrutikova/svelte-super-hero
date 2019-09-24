<script>
  export let name;
  export let score;

  let isValidScore = !isNaN(parseInt(score));
</script>

<div class="flex flex-col" style="width:{score}%">
  <div class="font-bold flex justify-between">

    {#if isValidScore}
      <span>{name}</span>
      <span>{score}%</span>
    {:else}
      <span class="text-gray-600">{name}</span>
      <span class="text-gray-600">NA</span>
    {/if}
  </div>
  <span
    class={'block h-2 rounded ' + (isValidScore ? 'bg-pink-800' : 'bg-gray-300')} />
</div>
