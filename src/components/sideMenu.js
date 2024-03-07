import { eventBus } from "../lib/eventBus.js";

export class sideMenuComponent {
  constructor() {
    this.eventSubscriberId = 'menuButton';
    this.sideMenu = document.querySelector("aside.side-menu");
    this.menuButton = document.querySelector(".menu-button");
    this.sideMenuBackdrop = document.querySelector(".side-menu-backdrop");
    this.eventBus = eventBus;
    this.init();
  }

  init() {
    const toggle = () => {
      if (this.sideMenu.classList.contains("side-menu-closed")) {
        this.sideMenu.classList.remove("side-menu-closed");
        this.sideMenuBackdrop.classList.remove('inactive');
      } else {
        this.sideMenu.classList.add("side-menu-closed");
        this.sideMenuBackdrop.classList.add('inactive');
      }
    };
    const close = () => {
        this.sideMenu.classList.add("side-menu-closed");
        this.sideMenuBackdrop.classList.add('inactive');
    };

    this.eventBus.subscribe(
      this.eventSubscriberId,
      "click",
      toggle.bind(this),
      { target: this.menuButton }
    );

    this.eventBus.subscribe(
      this.eventSubscriberId,
      "click",
      close.bind(this),
      { target: this.sideMenuBackdrop }
    );
  }
}
