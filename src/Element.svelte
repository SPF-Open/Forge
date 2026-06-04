<script lang="ts">
  interface Props {
    title?: import('svelte').Snippet;
    options?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  }

  let { title, options, children }: Props = $props();
</script>

<div class="element">
  <div class="element-header">
    <span class="element-title">{@render title?.()}</span>
    <div class="element-options">
      {@render options?.()}
    </div>
  </div>
  <div class="content">
    {@render children?.()}
  </div>
</div>

<style>
  .element {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  .element-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--color-border-light);
    background: var(--color-sidebar);
  }

  .element-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--color-text-secondary);
  }

  .element-options {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .element-options :global(> *) {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .content {
    padding: 1.25rem;
    overflow-x: auto;
  }
</style>
