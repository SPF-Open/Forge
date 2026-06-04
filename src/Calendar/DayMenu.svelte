<script lang="ts">
  import { createBubbler, stopPropagation } from 'svelte/legacy';

  const bubble = createBubbler();
  import type { Day } from "./Calendar.helper";

  interface Props {
    day: Day;
    onClose?: any;
    onEnter?: any;
  }

  let { day = $bindable(), onClose = () => {}, onEnter = () => {
    
  } }: Props = $props();
</script>

<div class="menu" onclick={stopPropagation(bubble('click'))} onkeypress={onEnter}>
  <label for="bg">Background</label>
  <input type="color" name="" id="bg" bind:value={day.bg} />
  <label for="border">Border</label>
  <input type="color" name="" id="border" bind:value={day.bd} />
  <label for="text">Text</label>
  <textarea name="" id="text" bind:value={day.text}></textarea>
  <button onclick={stopPropagation(onClose)}>Close</button>
</div>

<style>
  .menu {
    top: 80%;
    left: 50%;
    z-index: 1;
    position: absolute;
    background-color: white;
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.6rem;
    width: fit-content;
    padding: 0.3rem;
    border: 1px solid black;
    border-radius: 0.3rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
