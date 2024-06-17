import { Language } from "../store";

export class Day {
  constructor(public day: number, public isCurrentMonth: boolean, public text: string = "", public bg= "#fff", public bd = "#fff", public menu = false) {}
  get toString () {
    return this.text;
  } 
}

export const formatedDate = (date: Date, language: Language) => {
  const month = monthOfTheYear[language][date.getMonth()]
  const year = date.getFullYear();
  const yearStriped = year.toString().slice(0,3);
  return ` ${month} ${yearStriped}X`;
  //return `${weekOfTheDay[language][date.getDay()]} ${date.getDate()} ${monthOfTheYear[language][date.getMonth()]} ${date.getFullYear()}`;
}

export const weekOfTheDay = {
  [Language.FR]: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
  [Language.NL]: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
  [Language.DE]: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
};

export enum Size {
  sm = "sm",
  md = "md",
  lg = "lg",
}

export const monthOfTheYear = {
  [Language.FR]: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  [Language.NL]: [
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December",
  ],
  [Language.DE]: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
};