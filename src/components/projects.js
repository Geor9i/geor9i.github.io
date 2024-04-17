import { eventBus } from "../lib/eventBus.js";

export default class ProjectsComponent {
  constructor() {
    this.eventSubscriberId = "projects";
    this.mainElement = document.querySelector(".wrapper > main #projects");
    this.eventBus = eventBus;
  }
}
