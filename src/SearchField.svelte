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
  class="border-2 py-3 px-3 border-pink-800 rounded focus:border-deep-purple
  outline-none w-full"
  bind:value={term}
  on:keydown={handleKeyDown}
  placeholder="Search your hero" />
