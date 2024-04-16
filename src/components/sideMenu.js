import { eventBus } from "../lib/eventBus.js";

export class SideMenuComponent {
  constructor() {
    this.eventSubscriberId = "menuButton";
    this.sideMenu = document.querySelector("aside.side-menu");
    this.menuButton = document.querySelector(".menu-button");
    this.sideMenuBackdrop = document.querySelector(".side-menu-backdrop");
    this.eventBus = eventBus;
    this.findCenterclose = this._findCenterclose.bind(this);
    this.toggle = this._toggle.bind(this);
    this.init();
  }

  init() {
    this.eventBus.subscribe(this.eventSubscriberId, "click", this.toggle, {
      target: this.menuButton,
    });

    this.eventBus.subscribe(this.eventSubscriberId, "click", this.findCenterclose, {
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
  _findCenterclose = (e) => {
    this.sideMenu.classList.add("side-menu-closed");
    this.sideMenuBackdrop.classList.add("inactive");

    const id = e.target.id.split('-')[0];
    const section = document.getElementById(id);
    console.log(section.offsetTop, section.offsetHeight);
    const scrollTarget = section.offsetTop - ((window.innerHeight - section.offsetHeight) / 2);
    console.log('scrollTarget: ', scrollTarget);
    window.scrollTo({top: scrollTarget, behavior: 'smooth'});
    
  };
}
