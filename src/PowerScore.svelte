<script>
  export let name;
  export let score;

  $: isValidScore = !isNaN(parseInt(score));
  function getColor() {
    if (!isValidScore) return "";

    const intScore = parseInt(score);
    if (intScore >= 90) return "900";
    if (intScore >= 80) return "800";
    if (intScore >= 70) return "700";
    if (intScore >= 60) return "600";
    if (intScore >= 40) return "500";
    if (intScore >= 20) return "400";
    return "300";
  }
</script>

<div class="flex flex-col mb-1" style="width:{score}%">
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
    style="opacity: 0.9"
    class={'block h-2 rounded ' + (isValidScore ? 'bg-deep-blue-' + getColor() : 'bg-gray-300')} />
</div>
