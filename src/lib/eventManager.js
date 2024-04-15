import { GLOBAL_EVENT_TYPES } from "../constants.js";
import { eventBus } from "./eventBus.js";

export default class EventManager {
  
  constructor(defaultHost) {
    this.eventTypes = GLOBAL_EVENT_TYPES;
    this.hasInitilized = false;
    this.defaultHost = defaultHost;
    this.maxParentCounter = 50;
    this.eventBus = eventBus;
    this._init();
  }

  _init() {
    if (this.hasInitilized) throw new Error('Events already Initialized!');
    this.hasInitilized = true;
    this.eventTypes.forEach((event) => {
      let type, eventHost;
      if (typeof event === 'string') {
        type = event;
        eventHost = this.defaultHost;
      } else {
        type = event.type;
        eventHost = event.eventHost ? event.eventHost : this.defaultHost;
      }
      if (eventHost) {
        const eventRef = eventHost.addEventListener(type, (e) => {
          const { parents, children } = this.getRelatives(e);
          this.eventBus.publish({ e, parents, children });
        });
      }
    });
  }

  getRelatives(e) {
    let currentElement = e.target;
    const parents = [];
    if (e.target) {
      const target = e.target;
      const children = target.children ? Array.from(target.children) : [];
      let counter = this.maxParentCounter;
      while (currentElement && currentElement.parentElement && counter > 0) {
        currentElement = currentElement.parentElement;
        parents.push(currentElement);
        counter--;
        if (currentElement === e.currentTarget) {
          break;
        }
      }
      return { parents, children };
    }
    return { parents: [], children: [] };
  }
}
