<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let term = "";

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      dispatch("search", { term });
    }
  };
</script>

<input
  bind:value={term}
  on:keydown={handleKeyDown}
  placeholder="Search your hero" />
