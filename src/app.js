import { util } from "../utils/util.js";
import { eventBus } from "./eventBus.js";
import { eventsArr } from "./constants.js";
import Events from "./events.js";


const globalEvents = new Events(eventsArr, document, eventBus);
globalEvents.init()


const test = document.body;
eventBus.subscribe(test, 'mousemove', {}, () => {
    test.style['background-color'] = 'red';
})
console.log(eventBus);