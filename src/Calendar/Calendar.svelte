<script lang="ts">
  import { writable } from "svelte/store";
  import { Day, Size, formatedDate, weekOfTheDay } from "./Calendar.helper";
  import DayMenu from "./DayMenu.svelte";
  import { lang } from "../store";

  export let date = writable(new Date());
  export let dateString = writable("");
  const daysInCalendar = 42;
  let days: Day[] = [];
  let size = Size.md;
  let yearOffset = 0;
  let showNonCurrentMonth = false;

  $: console.log(showNonCurrentMonth);

  $: rows = Math.floor(days.length / 7);

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

    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const lastDayOfPreviousMonth = new Date(d.getFullYear(), d.getMonth(), 0);
    const daysInMonth = lastDay.getDate();
    const daysInPreviousMonth = lastDayOfPreviousMonth.getDate();
    const firstDayWeek = firstDay.getDay();

    days = [];
    for (let i = 0; i < daysInCalendar; i++) {
      if (i < firstDayWeek) {
        days.push(new Day(daysInPreviousMonth - firstDayWeek + i + 1, false));
      } else if (i < daysInMonth + firstDayWeek) {
        days.push(new Day(i - firstDayWeek + 1, true));
      } else {
        days.push(new Day(i - daysInMonth - firstDayWeek + 1, false));
      }
    }

    //If last 7 days are out of the current month, remove them
    if (days[days.length - 7].isCurrentMonth === false) {
      days = days.slice(0, daysInCalendar - 7);
    }
  });

  const nextMonth = () => {
    date.update((d) => new Date(d.getFullYear(), d.getMonth() + 1, 15));
  };

  const previousMonth = () => {
    date.update((d) => new Date(d.getFullYear(), d.getMonth() - 1, 15));
  };

  const onDayClick = (day: Day, force = true) => {
    if (force) days.map((d) => (d.menu = false));
    day.menu = !day.menu;
    days = [...days];
  };
</script>

<div class="calendar">
  <div class="header">
    <nav>
      <button on:click={previousMonth}>Previous</button>
      <button on:click={nextMonth}>Next</button>
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
  </div>
  <div class="div">
    <div class="lefttop dot"></div>
    <div class="leftbottom dot"></div>
    <div class="righttop dot"></div>
    <div class="rightbottom dot"></div>
    <h2 class="date">
      {formatedDate($date, $lang)}{yearOffset ? "+" + yearOffset : ""}
    </h2>
    <div class="grid" style="--nbRow:{rows}}">
      {#each weekOfTheDay[$lang] as day}
        <div class="weekday cell {size}">{day}</div>
      {/each}
      {#each days as day}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="day cell {size}"
          class:currentMonth={day.isCurrentMonth ||showNonCurrentMonth}
          on:click={() => onDayClick(day)}
        >
          <div
            class="innerCell"
            style="background:{day.bg}; border-color:{day.bd}"
          >
            <span> {day.day}</span>
            <span>{day.text}</span>
          </div>
          {#if day.menu && (day.isCurrentMonth || showNonCurrentMonth)}
            <DayMenu {day} onClose={() => onDayClick(day, false)} />
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .date {
    margin: 0.2rem;
    font-size: 2rem;
  }
  .calendar {
    zoom: 1.2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    text-align: center;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.25rem;
  }

  .header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .grid {
    margin: 1rem;
    --bd: darkgray;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(var(--rows), 1fr);
    border-radius: 0.8rem;
    position: relative;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--bd);
  }

  .cell.sm {
    width: 5rem;
  }

  .cell.md {
    width: 8rem;
  }

  .cell.lg {
    width: 11rem;
  }

  .cell:last-child, .cell:last-child > * {
    border-radius: 0 0 0.8rem 0.8rem;
  }

  .cell:nth-last-child(7), .cell:nth-last-child(7) > * {
    border-radius: 0 0 0 0.8rem;
  }

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
    font-weight: bold;
  }

  .innerCell {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 10px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .day {
    text-align: center;
    color: white;
  }

  .currentMonth {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .currentMonth {
    color: black;
  }

  .footer {
    display: flex;
    justify-content: center;
  }

  input[type="number"] {
    width: 2rem;
  }
</style>
