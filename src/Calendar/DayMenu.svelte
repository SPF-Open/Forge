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
    top: 100%;
    left: 0;
    z-index: 10;
    position: absolute;
    background: var(--color-surface);
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem 0.75rem;
    align-items: center;
    width: 14rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border-strong);
    border-top: 3px solid var(--color-accent);
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  }

  .menu label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    white-space: nowrap;
  }

  .menu input[type="color"] {
    width: 100%;
    height: 1.75rem;
    border: 1px solid var(--color-border-strong);
    border-radius: 2px;
    padding: 2px;
    cursor: pointer;
    background: var(--color-surface);
  }

  .menu textarea {
    grid-column: 1 / -1;
    width: 100%;
    min-height: 4rem;
    resize: vertical;
    font-size: 0.8125rem;
    line-height: 1.4;
  }

  .menu button {
    grid-column: 1 / -1;
    margin-top: 0.25rem;
    width: 100%;
    font-size: 0.75rem;
    padding: 0.3rem 0.75rem;
  }
</style>
