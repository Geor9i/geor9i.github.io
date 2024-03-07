export default class Events {
  constructor(eventsArr, eventElement, eventBus) {
    this.eventElement = eventElement;
    this.events = eventsArr;
    this.currentEvent = null;
    this.eventBus = eventBus;
    this.hasInitilized = false;
  }

  init() {
    if (this.hasInitilized) throw new Error('Events already Initialized!');

    this.hasInitilized = true;
    this.events.forEach((event) => {
      const eventRef = this.eventElement.addEventListener(event, (e) => {
        this.currentEvent = event;
        console.log(e.type);
        this.eventBus.publish({ e });
      });
    });
  }
}
