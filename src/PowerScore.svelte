<script>
  /** props */
  export let name;
  export let score;

  /** declarations */
  let isValidScore = score !== null;
  function getColor() {
    if (!isValidScore) return "";

    if (score >= 90) return "900";
    if (score >= 80) return "800";
    if (score >= 70) return "700";
    if (score >= 60) return "600";
    if (score >= 40) return "500";
    if (score >= 20) return "400";
    return "300";
  }
  let color = getColor();
</script>

<div class="flex flex-col mb-1" style="width:{score}%">
  <div class="font-bold flex justify-between">
    {#if isValidScore}
      <span class="block mr-4">{name}</span>
      <span>{score}%</span>
    {:else}
      <span class="text-gray-600">{name}</span>
      <span class="text-gray-600">NA</span>
    {/if}
  </div>
  <span
    style="opacity: 0.9"
    class={'block h-2 rounded ' + (isValidScore ? 'bg-deep-blue-' + color : 'bg-gray-300')} />
</div>
