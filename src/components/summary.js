import { eventBus } from "../lib/eventBus.js";

export default class SummaryComponent {
  constructor() {
    this.eventSubscriberId = "summary";
    this.mainElement = document.querySelector(".wrapper > main #summary");
    this.eventBus = eventBus;
  }
}
