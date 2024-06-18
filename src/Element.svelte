<div class="element">
  <h2>
    <slot name="title" />
  </h2>
  <div class="options">
    <slot name="options" />
  </div>
  <hr>
  <div class="content">
    <div class="lefttop corner"></div>
    <div class="rightbottom corner"></div>
    <slot />
  </div>
</div>

<style>
  .element {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    max-width: 1450px;
    margin: auto;
    padding: 0.5rem;
    margin: 0.5rem;
  }
  h2 {
    text-align: center;
  }
  .options {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
  }
  .options :global(>*) {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 0.25rem;
  }
  .content {
    position: relative;
    margin: 1rem auto;
    width: fit-content;
    padding: 2rem;
  }

  .corner {
    width: 1rem;
    height: 1rem;
    border: 2px solid black;
    border-top: 10px;
    border-left: 10px;
    position: absolute;
  }
  .lefttop {
    top: 0;
    left: -10px;
  }

  .rightbottom {
    bottom: 0;
    right: -10px;
    rotate: 180deg;
  }
</style>
