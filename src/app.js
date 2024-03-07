import { util } from "../utils/globalUtil.js";
import { eventBus } from "./lib/eventBus.js";
import { GLOBAL_EVENT_TYPES } from "./constants.js";
import EventManager from "./lib/eventManager.js";
import { sideMenuComponent } from "./components/sideMenu.js";

const eventManager = new EventManager(GLOBAL_EVENT_TYPES, document, eventBus);
const sideMenu = new sideMenuComponent();
