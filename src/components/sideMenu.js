import { eventBus } from "../eventBus.js";

export class sideMenuComponent {
  constructor() {
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
      "menuButton",
      "click",
      { target: this.menuButton },
      toggle.bind(this)
    );

    this.eventBus.subscribe(
      "menuButton",
      "click",
      { target: this.sideMenuBackdrop },
      close.bind(this)
    );
  }
}
