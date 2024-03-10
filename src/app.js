import { eventBus } from "./lib/eventBus.js";
import { GLOBAL_EVENT_TYPES } from "./constants.js";
import EventManager from "./lib/eventManager.js";
import { SideMenuComponent } from "./components/sideMenu.js";
import MainComponent from "./components/main.js";
import MainCanvasComponent from "./canvas/mainCanvas.js";
import CertificatesComponent from "./components/certificates/certificates.js";

const eventManager = new EventManager(GLOBAL_EVENT_TYPES, document.body, eventBus);
const sideMenu = new SideMenuComponent();
const mainComponent = new MainComponent();
const mainCanvasComponent = new MainCanvasComponent();
const certificatesComponent = new CertificatesComponent();