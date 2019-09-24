<script>
  import PowerScore from "./PowerScore.svelte";

  export let superHero;
</script>

<div class="bg-white rounded-lg max-width-4 overflow-hidden border flex mb-6">
  <div
    style="background-image: url('{superHero.image.url}')"
    class="bg-cover" />
  <div class="md:w-64 lg:w-1/5 flex items-center">
    <img src={superHero.image.url} alt={superHero.name} />
  </div>
  <div class="px-6 pb-2 sm:w-full md:w-2/3 lg:w-1/2">
    <h4 class="font-bold font-heading text-4xl">{superHero.name}</h4>
    <span class="mb-2 block">{superHero.biography['full-name']}</span>

    <div class="flex flex-col mb-3">
      <PowerScore
        name="Intelligence"
        score={superHero.powerstats.intelligence} />
      <PowerScore name="Strength" score={superHero.powerstats.strength} />
      <PowerScore name="Speed" score={superHero.powerstats.speed} />
      <PowerScore name="Durability" score={superHero.powerstats.durability} />
      <PowerScore name="Power" score={superHero.powerstats.power} />
      <PowerScore name="Combat" score={superHero.powerstats.combat} />
    </div>
    <div>
      {superHero.biography['first-appearance']}
      {superHero.biography['publisher']}
    </div>
  </div>
</div>
