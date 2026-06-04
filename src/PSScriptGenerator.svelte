<script lang="ts">
  import {
    generateCompactScript,
    generateCleanScript,
    validateFolders,
    copyToClipboard,
  } from "./utils/psScriptGenerator";

  let folders: string[] = $state(["CDD1"]);
  let folderInput = $state("");
  let selectedFormat = $state<"compact" | "clean">("clean");
  let generatedScript = $state("");
  let copied = $state(false);
  let error = $state("");

  function addFolder() {
    const trimmed = folderInput.trim();
    if (!trimmed) return;

    folders = [...folders, trimmed];
    folderInput = "";
    generateScript();
  }

  function removeFolder(index: number) {
    folders.splice(index, 1);
    folders = folders;
    generateScript();
  }

  function generateScript() {
    const validation = validateFolders(folders);

    if (!validation.isValid) {
      error = validation.error || "Invalid input";
      generatedScript = "";
      return;
    }

    error = "";

    if (selectedFormat === "compact") {
      generatedScript = generateCompactScript(folders);
    } else {
      generatedScript = generateCleanScript(folders);
    }
  }

  function handleCopyScript() {
    if (generatedScript) {
      copyToClipboard(generatedScript);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    }
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === "Enter") {
      addFolder();
    }
  }

  // Generate script on mount
  $effect(() => {
    generateScript();
  });
</script>

<div class="generator">
  <div class="generator-header">
    <div class="header-icon">📜</div>
    <div>
      <h2>PowerShell Script Generator</h2>
      <p class="subtitle">Create folder structures with Avant and Après subfolders</p>
    </div>
  </div>

  <div class="section">
    <h3>Folder Names</h3>
    <div class="input-group">
      <input
        type="text"
        placeholder="e.g., CDD9-12.05.2026-A3-2510-088"
        bind:value={folderInput}
        onkeypress={handleKeyPress}
      />
      <button onclick={addFolder} class="btn-primary">Add Folder</button>
    </div>

    {#if error}
      <div class="error">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>{error}</span>
      </div>
    {/if}

    <div class="folder-list">
      {#each folders as folder, index (index)}
        <div class="folder-item">
          <span class="folder-name">{folder}</span>
          <button class="btn-remove" onclick={() => removeFolder(index)} title="Remove">×</button>
        </div>
      {/each}
    </div>
  </div>

  <div class="section">
    <h3>Script Format</h3>
    <div class="format-buttons">
      <button
        class="format-btn"
        class:active={selectedFormat === "clean"}
        onclick={() => {
          selectedFormat = "clean";
          generateScript();
        }}
      >
        Clean (Multi-line)
      </button>
      <button
        class="format-btn"
        class:active={selectedFormat === "compact"}
        onclick={() => {
          selectedFormat = "compact";
          generateScript();
        }}
      >
        Compact (One-liner)
      </button>
    </div>
  </div>

  {#if generatedScript}
    <div class="section">
      <div class="section-header">
        <h3>Generated Script</h3>
        <button
          class="btn-copy"
          onclick={handleCopyScript}
          class:copied
        >
          {#if copied}
            ✓ Copied
          {:else}
            Copy
          {/if}
        </button>
      </div>
      <div class="script-container">
        <pre><code>{generatedScript}</code></pre>
      </div>
    </div>
  {/if}
</div>

<style>
  .generator {
    width: 100%;
    padding: 0;
    background: transparent;
    border-radius: 0;
  }

  .generator-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .header-icon {
    font-size: 2.5rem;
    margin-top: 0.25rem;
  }

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.3px;
    color: var(--color-text);
  }

  .subtitle {
    margin: 0.375rem 0 0 0;
    font-size: 13px;
    color: var(--color-text-secondary);
  }

  .section {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin-bottom: 1.25rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  h3 {
    margin: 0 0 0.75rem 0;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: var(--color-text-secondary);
  }

  .input-group {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  input[type="text"] {
    flex: 1;
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    border-radius: 0.4rem;
    font-size: 13px;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  input[type="text"]:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }

  input::placeholder {
    color: var(--color-text-muted);
  }

  .btn-primary {
    padding: 0.625rem 1.2rem;
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: 0.4rem;
    font-weight: 500;
    cursor: pointer;
    font-size: 13px;
    transition: background 0.2s;
  }

  .btn-primary:hover {
    background: var(--color-accent-hover);
  }

  .error {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fcb4b4;
    border-radius: 0.4rem;
    font-size: 13px;
    margin-bottom: 1rem;
  }

  .error svg {
    flex-shrink: 0;
    margin-top: 2px;
  }

  .folder-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .folder-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.625rem 0.875rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border-light);
    border-radius: 0.4rem;
    font-size: 13px;
  }

  .folder-name {
    color: var(--color-text);
    font-weight: 500;
  }

  .btn-remove {
    background: none;
    border: none;
    color: var(--color-text-muted);
    font-size: 18px;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    line-height: 1;
  }

  .btn-remove:hover {
    color: var(--color-danger);
  }

  .format-buttons {
    display: flex;
    gap: 0.625rem;
  }

  .format-btn {
    flex: 1;
    padding: 0.625rem 0.875rem;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    border-radius: 0.4rem;
    cursor: pointer;
    font-weight: 500;
    font-size: 13px;
    transition: all 0.2s;
  }

  .format-btn:hover {
    border-color: var(--color-accent);
    background: var(--color-accent-light);
  }

  .format-btn.active {
    border-color: var(--color-accent);
    background: var(--color-accent);
    color: white;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .section-header h3 {
    margin: 0;
  }

  .script-container {
    position: relative;
    border-radius: 0.4rem;
    overflow: hidden;
  }

  pre {
    background: #1e293b;
    border: 1px solid var(--color-border);
    border-radius: 0.4rem;
    padding: 1rem;
    overflow-x: auto;
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
  }

  code {
    font-family: 'SF Mono', 'Monaco', 'Menlo', 'Courier New', monospace;
    color: #e2e8f0;
  }

  .btn-copy {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    font-weight: 500;
    font-size: 12px;
    transition: background 0.2s;
    backdrop-filter: blur(4px);
  }

  .btn-copy:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .btn-copy.copied {
    background: var(--color-success);
  }
</style>
