import { eventBus } from "../lib/eventBus.js";

export default class MainComponent {
  constructor() {
    this.eventSubscriberId = "main";
    this.mainElement = document.querySelector(".wrapper main");
    this.eventBus = eventBus;
    this.activeSections = {};
    this.innerScroll = this._innerScroll.bind(this);
    this.initScoll();
    this.init();
  }

  init() {
    this.eventBus.subscribe(
      this.eventSubscriberId,
      "scrollElement",
      this.innerScroll
    );
    const sections = Array.from(
      this.mainElement.querySelectorAll("main > section")
    );
    sections.forEach((section) =>
      Array.from(section.children).forEach((child) =>
        child.classList.add("fade")
      )
    );
  }

  initScoll() {
    window.addEventListener("scrollElement", (e) => {
      this.eventBus.publish({ e });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
          const scrollEvent = new CustomEvent("scrollElement", {
            detail: entry,
          });
          dispatchEvent(scrollEvent);
        });
      },
      {
        threshold: 0.8,
      }
    );
    const sections = this.mainElement.querySelectorAll("main > section");
    sections.forEach((section) => observer.observe(section));
  }

  _innerScroll(e) {
    const observer = e.detail;
    const section = observer.target;
    let children = Array.from(section.children);
    if (
      observer.isIntersecting &&
      !this.activeSections.hasOwnProperty(section.id)
    ) {
      const ref = setInterval(() => {
        let child = children.shift();
        if (child) {
          child.classList.remove("fade");
        }
      }, 150);
      this.activeSections[section.id] = { ref };
    } else {
      children.forEach((child) => child.classList.add("fade"));
      if (this.activeSections.hasOwnProperty(section.id)) {
        clearInterval(this.activeSections[section.id].ref);
        delete this.activeSections[section.id];
      }
    }
  }
}
