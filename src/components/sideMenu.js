import { eventBus } from "../lib/eventBus.js";

export class SideMenuComponent {
  constructor() {
    this.eventSubscriberId = "menuButton";
    this.sideMenu = document.querySelector("aside.side-menu");
    this.menuButton = document.querySelector(".menu-button");
    this.sideMenuBackdrop = document.querySelector(".side-menu-backdrop");
    this.eventBus = eventBus;
    this.close = this._close.bind(this);
    this.toggle = this._toggle.bind(this);
    this.init();
  }

  init() {
    this.eventBus.subscribe(this.eventSubscriberId, "click", this.toggle, {
      target: this.menuButton,
    });

    this.eventBus.subscribe(this.eventSubscriberId, "click", this.close, {
      target: [this.sideMenuBackdrop, '.wrapper aside ul li'],
    });

  }

  _toggle = () => {
    if (this.sideMenu.classList.contains("side-menu-closed")) {
      this.sideMenu.classList.remove("side-menu-closed");
      this.sideMenuBackdrop.classList.remove("inactive");
    } else {
      this.sideMenu.classList.add("side-menu-closed");
      this.sideMenuBackdrop.classList.add("inactive");
    }
  };
  _close = () => {
    this.sideMenu.classList.add("side-menu-closed");
    this.sideMenuBackdrop.classList.add("inactive");
  };
}
