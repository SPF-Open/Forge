<script lang="ts">
  import Calendar from "./Calendar/Calendar.svelte";
  import PSScriptGenerator from "./PSScriptGenerator.svelte";
  import { Language, lang } from "./store";

  let sidebarOpen = $state(false);
  let activeNav = $state<"calendar" | "generator">("calendar");
</script>

<header>
  <div class="header-content">
    <button class="header-btn menu-btn" onclick={() => (sidebarOpen = !sidebarOpen)} title="Toggle menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
    <span class="brand-name">Forge</span>
    <div class="header-spacer"></div>
  </div>
</header>

<div class="container">
  <aside class="sidebar" class:open={sidebarOpen}>
    <nav class="sidebar-section">
      <h3 class="sidebar-title">TOOLS</h3>
      <div class="nav-items">
        <button
          class="nav-item"
          class:active={activeNav === "calendar"}
          onclick={() => {
            activeNav = "calendar";
            sidebarOpen = false;
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>Calendar</span>
        </button>
        <button
          class="nav-item"
          class:active={activeNav === "generator"}
          onclick={() => {
            activeNav = "generator";
            sidebarOpen = false;
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          <span>Script Generator</span>
        </button>
      </div>
    </nav>

    <hr class="sidebar-divider" />

    <div class="sidebar-section">
      <h3 class="sidebar-title">OPTIONS</h3>
      <div class="option-group">
        <label for="lang">Language</label>
        <select bind:value={$lang} id="lang" class="premium-select">
          <option value={Language.FR}>FR - Français</option>
          <option value={Language.NL}>NL - Nederlands</option>
          <option value={Language.DE}>DE - Deutsch</option>
        </select>
      </div>
    </div>
  </aside>

  <main class="main-content">
    <div class="content-section">
      {#if activeNav === "calendar"}
        <Calendar />
      {:else if activeNav === "generator"}
        <PSScriptGenerator />
      {/if}
    </div>
  </main>
</div>

<style>
  header {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1rem;
    height: 3.5rem;
  }

  .header-btn {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.4rem;
    transition: all 0.2s;
    box-shadow: none;
  }

  .header-btn:hover {
    color: var(--color-text);
    background: var(--color-border-light);
    box-shadow: none;
  }

  .menu-btn {
    margin-right: 1rem;
  }

  .brand-name {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.3px;
    color: var(--color-text);
  }

  .header-spacer {
    flex: 1;
  }

  .container {
    display: flex;
    height: calc(100vh - 3.5rem);
  }

  .sidebar {
    width: 260px;
    background: var(--color-sidebar);
    border-right: 1px solid var(--color-border);
    padding: 1rem;
    overflow-y: auto;
    transition: transform 0.3s;
  }

  .sidebar-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    margin: 0 0 0.75rem 0;
    padding: 0;
  }

  .sidebar-section {
    margin-bottom: 1.5rem;
  }

  .sidebar-section:first-child {
    margin-top: 0;
  }

  .sidebar-divider {
    margin: 0.75rem 0;
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.875rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: 0.4rem;
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.2s;
    justify-content: flex-start;
    width: 100%;
    box-shadow: none;
  }

  .nav-item:hover {
    background: var(--color-accent-light);
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .nav-item.active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #fff;
  }

  .option-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .option-group label {
    display: block;
  }

  .premium-select {
    width: 100%;
    padding: 0.625rem 0.75rem;
    font-size: 13px;
  }

  .main-content {
    flex: 1;
    overflow-y: auto;
    background: var(--color-bg);
    padding: 1.5rem;
  }

  .content-section {
    max-width: 1000px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    .sidebar {
      position: fixed;
      left: 0;
      top: 3.5rem;
      height: calc(100vh - 3.5rem);
      transform: translateX(-100%);
      z-index: 99;
      width: 260px;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .main-content {
      padding: 1rem;
    }
  }
</style>
