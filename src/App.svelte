<script lang="ts">
  import Calendar from "./Calendar/Calendar.svelte";
  import Element from "./Element.svelte";
  import { Language, lang } from "./store";
</script>

<main>
  <h1>Forge</h1>
  <div class="options">
    <h3>Global Options</h3>
    <div class="body">
      <div class="lang">
        <label for="lang"> Langage</label>
        <select bind:value={$lang} id="lang">
          <option value={Language.FR}>FR</option>
          <option value={Language.NL}>NL</option>
          <option value={Language.DE}>DE</option>
        </select>
      </div>
    </div>
  </div>

  <Element>
    <span slot="title"> Calendar </span>
    <Calendar />
  </Element>
</main>

<style>
  .options > div {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
</style>
