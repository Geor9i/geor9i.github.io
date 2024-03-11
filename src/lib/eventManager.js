export default class EventManager {
  constructor(eventTypes, eventElement, eventBus) {
    this.eventElement = eventElement;
    this.eventTypes = eventTypes;
    this.currentEvent = null;
    this.eventBus = eventBus;
    this.hasInitilized = false;
    this._init()
  }

  _init() {
    if (this.hasInitilized) throw new Error('Events already Initialized!');

    this.hasInitilized = true;
    this.eventTypes.forEach((event) => {
      let eventName, eventSource;
      if (typeof event === 'object') {
        eventName = event.type;
        eventSource = event.target;
      } else {
        eventName = event;
        eventSource = this.eventElement;
      }
      const eventRef = eventSource.addEventListener(eventName, (e) => {
        this.currentEvent = event;
        const { parents, children } = this.getRelatives(e);
        this.eventBus.publish({ e, parents, children });

      });
    });
  }

  getRelatives(e) {
    let currentElement = e.target;
    const parents = [];
    const children = e.target.children ?Array.from(e.target.children): [];
    while (currentElement && currentElement !== document.body) {
      currentElement = currentElement?.parentElement;
      if (currentElement) {
        parents.push(currentElement);
      }
    }
    return { parents, children }
  }

}
