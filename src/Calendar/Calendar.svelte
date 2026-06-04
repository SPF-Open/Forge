<script lang="ts">
  import { writable } from "svelte/store";

  import html2canvas from "html2canvas";
  import { Day, Size, formatedDate, weekOfTheDay } from "./Calendar.helper";
  import DayMenu from "./DayMenu.svelte";
  import { lang } from "../store";
  import Element from "../Element.svelte";

  
  interface Props {
    // Stores
    date?: any;
    dateString?: any;
  }

  let { date = writable(new Date()), dateString = writable("") }: Props = $props();

  // Construction
  let days: Day[] = $state([]);
  let rows = $derived(Math.floor(days.length / 7));

  // Options
  let size = $state(Size.md);
  let yearOffset = $state(0);
  let showNonCurrentMonth = $state(false);

  // When we update the date with datepicker
  dateString.subscribe((d) => {
    const dateStringTemp = $date.toISOString().split("T")[0];
    if (d && dateStringTemp !== $dateString) {
      date.update((_) => new Date(d));
    }
  });

  date.subscribe((d) => {
    const dateStringTemp = $date.toISOString().split("T")[0];
    if (dateStringTemp !== $dateString) {
      dateString.update((_) => dateStringTemp);
      console.log(dateStringTemp);
    }
    days = Day.from(d);
  });

  const changeMonth = (offset: number) => {
    date.update((d) => new Date(d.getFullYear(), d.getMonth() + offset, 15));
  };

  const onDayClick = (day: Day, force = true) => {
    if (force) days.map((d) => (d.menu = false));
    day.menu = !day.menu;
    days = [...days];
  };

  let gridEl: HTMLElement | undefined;

  const exportPng = async () => {
    if (!gridEl) return;

    const scale = 2;
    const gridCanvas = await html2canvas(gridEl, { useCORS: true, scale });

    // Build title string: "June 2026" (+ offset if any)
    const title = formatedDate($date, $lang) + (yearOffset ? (yearOffset > 0 ? "+" : "") + yearOffset : "");

    // Add a header band above the grid
    const headerH = 48 * scale;
    const out = document.createElement("canvas");
    out.width = gridCanvas.width;
    out.height = gridCanvas.height + headerH;

    const ctx = out.getContext("2d")!;

    // Header background
    ctx.fillStyle = "#003366";
    ctx.fillRect(0, 0, out.width, headerH);

    // Title text
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 ${22 * scale}px Inter, Segoe UI, system-ui, sans-serif`;
    ctx.textBaseline = "middle";
    ctx.fillText(title, 16 * scale, headerH / 2);

    // Grid below
    ctx.drawImage(gridCanvas, 0, headerH);

    const a = document.createElement("a");
    a.href = out.toDataURL("image/png");
    a.download = `calendar-${$dateString}${yearOffset ? (yearOffset > 0 ? "+" : "") + yearOffset : ""}.png`;
    a.click();
  };
</script>

<Element>
  {#snippet title()}
    <span >Calendar</span>
  {/snippet}
  {#snippet options()}
  
      <nav>
        <button onclick={() => changeMonth(-1)}>Previous</button>
        <button onclick={() => changeMonth(+1)}>Next</button>
      </nav>
      <div class="dateInput">
        <input type="date" bind:value={$dateString} />
      </div>
      <div class="size">
        <select bind:value={size}>
          <option value={Size.sm}>Small</option>
          <option value={Size.md}>Medium</option>
          <option value={Size.lg}>Large</option>
        </select>
      </div>
      <div class="offset">
        <input type="number" id="offset" bind:value={yearOffset} />
        <label for="offset">Offset</label>
      </div>
      <div class="showNonCurrentMonth">
        <input
          type="checkbox"
          id="showNonCurrentMonth"
          bind:checked={showNonCurrentMonth}
        />
        <label for="showNonCurrentMonth">Show non current month</label>
      </div>
      <button onclick={exportPng}>Export PNG</button>
    
  {/snippet}
  {#snippet children()}
  
      <h2 class="date">
        {formatedDate($date, $lang)}{yearOffset
          ? (yearOffset > 0 ? "+" : "") + yearOffset
          : ""}
      </h2>
      <div class="grid" style="--nbRow:{rows}}" bind:this={gridEl}>
        {#each weekOfTheDay[$lang] as day}
          <div class="weekday cell {size}">{day}</div>
        {/each}
        {#each days as day}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <div
            class="day cell {size}"
            class:currentMonth={day.isCurrentMonth || showNonCurrentMonth}
            onclick={() => onDayClick(day)}
            style="background:{day.bg};"
          >
            <div class="innerCell" style="border-color:{day.bd}">
              <span> {day.day}</span>
              <span>{day.text}</span>
            </div>
            {#if day.menu && (day.isCurrentMonth || showNonCurrentMonth)}
              <DayMenu {day} onClose={() => onDayClick(day, false)} />
            {/if}
          </div>
        {/each}
      </div>
    
  {/snippet}
</Element>

<style>
  .date {
    margin: 0 0 0.75rem 0;
    font-size: 1.375rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--color-accent);
    text-align: center;
  }

  .grid {
    --bd: var(--color-border);
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    position: relative;
    border: 1px solid var(--bd);
    width: fit-content;
  }

  .cell.sm { width: 5.5rem; }
  .cell.md { width: 7.5rem; }
  .cell.lg { width: 9.5rem; }

  .cell:nth-child(7n) {
    border-right: 1px solid transparent;
  }

  .cell:nth-last-child(-n + 7) {
    border-bottom: 1px solid transparent;
  }

  .cell {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--bd);
    border-bottom: 1px solid var(--bd);
    font-weight: 500;
    font-size: 0.8125rem;
  }

  .weekday.cell {
    background: var(--color-accent);
    color: #fff;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.375rem 0;
  }

  .innerCell {
    padding: 0.375rem 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    min-height: 3.5rem;
    border: 3px solid transparent;
    box-sizing: border-box;
    gap: 0.25rem;
    cursor: pointer;
    transition: background 0.1s;
  }

  .innerCell:hover {
    background: var(--color-accent-light);
  }

  .innerCell span:first-child {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--color-text);
    line-height: 1;
    padding: 0.125rem 0.25rem;
  }

  .innerCell span:last-child {
    font-size: 0.6875rem;
    color: var(--color-text-muted);
    line-height: 1.3;
    padding: 0 0.25rem;
  }

  .day {
    color: transparent;
    background: #f8f8f6 !important;
  }

  .currentMonth {
    display: flex;
    justify-content: center;
    align-items: stretch;
    background: var(--color-surface) !important;
  }

  input[type="number"] {
    width: 3.5rem;
  }
</style>
