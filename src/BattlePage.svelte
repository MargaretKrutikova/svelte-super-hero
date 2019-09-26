<script>
  /** props */
  export let request;
  export let nav;

  /** declarations */
  import { battleStore } from "./BattleStore.ts";
  import SuperHeroBattle from "./SuperHeroBattle.svelte";

  $: ids =
    request.query && request.query.ids ? request.query.ids.split(",") : [];
</script>

<div>
  {#each $battleStore.participants as hero}
    <div>
      <img
        class="border rounded-full h-48 w-48 object-cover mb-3"
        src={hero.image.url}
        alt={hero.name} />
      <h4>{hero.name}</h4>
    </div>
  {/each}

  <SuperHeroBattle participants={$battleStore.participants} />

</div>
