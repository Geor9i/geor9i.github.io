import EventManager from "./lib/eventManager.js";
import { SideMenuComponent } from "./components/sideMenu.js";
import MainComponent from "./components/main.js";
import MainCanvasComponent from "./canvas/mainCanvas.js";
import CertificatesComponent from "./components/certificates/certificates.js";
import TechnologiesComponent from "./components/technologies.js";

const eventManager = new EventManager(document.body);
const sideMenu = new SideMenuComponent();
const mainComponent = new MainComponent();
const technologiesComponent = new TechnologiesComponent();
const mainCanvasComponent = new MainCanvasComponent();
const certificatesComponent = new CertificatesComponent();