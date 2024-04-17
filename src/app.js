import EventManager from "./lib/eventManager.js";
import { SideMenuComponent } from "./components/sideMenu.js";
import MainComponent from "./components/main.js";
import MainCanvasComponent from "./canvas/mainCanvas.js";
import CertificatesComponent from "./components/certificates/certificates.js";
import TechnologiesComponent from "./components/technologies.js";
import LanguagesComponent from "./components/languages.js";
import SummaryComponent from "./components/summary.js";
import ContactsComponent from "./components/contacts.js";

const eventManager = new EventManager(document.body);
const sideMenu = new SideMenuComponent();
const mainComponent = new MainComponent();

const summaryComponent = new SummaryComponent();
const contactsComponent = new ContactsComponent();
const technologiesComponent = new TechnologiesComponent();
const mainCanvasComponent = new MainCanvasComponent();
const certificatesComponent = new CertificatesComponent();
const languagesComponent = new LanguagesComponent();