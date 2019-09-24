<script>
  import PowerScore from "./PowerScore.svelte";

  export let superHero;
  let appearance = superHero.biography["first-appearance"];
</script>

<div
  class="bg-white rounded-lg relative max-width-4 overflow-hidden border grid
  grid-template-card mb-6 lg:mb-10">
  <div class="hidden md:block w-auto h-auto">
    <div
      style="background-image: url('{superHero.image.url}')"
      class="bg-cover h-full w-full bg-center" />
  </div>
  <div class="px-6 pt-2 pb-3 w-full flex flex-col items-center md:items-start">
    <h4 class="font-bold text-deep-blue-base font-heading text-4xl">
      {superHero.name}
    </h4>
    <span class="mb-2 block">{superHero.biography['full-name']}</span>

    <img
      class="md:hidden border rounded-full h-48 w-48 object-cover mb-3"
      src={superHero.image.url}
      alt={superHero.name} />

    <div
      class="flex flex-col w-full mx-auto md:mx-0 max-w-md lg:w-full mb-2
      self-stretch">
      <PowerScore
        name="Intelligence"
        score={superHero.powerstats.intelligence} />
      <PowerScore name="Strength" score={superHero.powerstats.strength} />
      <PowerScore name="Speed" score={superHero.powerstats.speed} />
      <PowerScore name="Durability" score={superHero.powerstats.durability} />
      <PowerScore name="Power" score={superHero.powerstats.power} />
      <PowerScore name="Combat" score={superHero.powerstats.combat} />
    </div>
    {#if appearance !== '-'}
      <div class="break-word text-center md:text-left">
        <span class="block text-gray-600">First appearence:</span>
        <span class="font-semibold text-gray-800">
          {superHero.biography['first-appearance']} by
          <span class="text-deep-blue-400">
            {superHero.biography['publisher']}
          </span>
        </span>
      </div>
    {/if}
  </div>
</div>
