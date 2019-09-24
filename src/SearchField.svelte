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

<div class="relative flex items-center">
  <svg class="absolute h-8 lg:h-12 text-white" viewBox="0 0 16 16">
    <path
      fill="currentColor"
      d="M15.7,14.3l-3.105-3.105C13.473,10.024,14,8.576,14,7c0-3.866-3.134-7-7-7S0,3.134,0,7s3.134,7,7,7
      c1.576,0,3.024-0.527,4.194-1.405L14.3,15.7c0.184,0.184,0.38,0.3,0.7,0.3c0.553,0,1-0.447,1-1C16,14.781,15.946,14.546,15.7,14.3z
      M2,7c0-2.762,2.238-5,5-5s5,2.238,5,5s-2.238,5-5,5S2,9.762,2,7z" />
  </svg>
  <input
    class="pl-12 lg:pl-16 py-2 pr-4 tracking-wider uppercase font-semibold
    border-b-2 font-heading bg-transparent text-white text-2xl lg:text-4xl
    outline-none w-full"
    bind:value={term}
    on:keydown={handleKeyDown}
    placeholder="Search your hero" />
</div>
