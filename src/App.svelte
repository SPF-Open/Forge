<script lang="ts">
  import CalendarPage from "./Calendar/Page.svelte";
  import { Language, lang } from "./store";

</script>

<main >
  <h1>Forge</h1>
  <div class="lang">
    <select bind:value={$lang}>
      <option value={Language.FR}>FR</option>
      <option value={Language.NL}>NL</option>
      <option value={Language.DE}>DE</option>
    </select>
  </div>
  <CalendarPage />
</main>

<style>
</style>
