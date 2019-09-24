<script>
  export let name;
  export let score;
</script>

<div class="flex flex-col" style="width:{score}%">
  <div class="font-bold flex justify-between">
    <span>{name}</span>
    <span>{score}%</span>
  </div>
  <span class="block h-2 rounded bg-pink-800" />
</div>
