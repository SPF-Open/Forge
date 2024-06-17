<div>
  <h2>
    <slot name="title" />
  </h2>
  <slot />
</div>

<style>
  h2 {
    text-align: center;
  }
  div {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    max-width: 1450px;
    margin: auto;
    padding: 0.5rem;
    margin: 0.5rem;
  }
</style>
