import { util } from "../utils/util.js";
import { eventBus } from "./eventBus.js";
import { eventsArr } from "./constants.js";
import Events from "./events.js";
import { sideMenuComponent } from "./components/sideMenu.js";

const globalEvents = new Events(eventsArr, document, eventBus);
globalEvents.init()

const sideMenu = new sideMenuComponent();
