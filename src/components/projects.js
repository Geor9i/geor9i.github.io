import { PROJECTS } from "../constants.js";
import { eventBus } from "../lib/eventBus.js";

export default class ProjectsComponent {
  constructor() {
    this.eventSubscriberId = "projects";
    this.mainElement = document.querySelector(".wrapper > main #projects");
    this.eventBus = eventBus;
    this.projects = PROJECTS;
    this.init();
  }

  init() {
    this.display();
  }

  display() {
    const fragment = document.createDocumentFragment();
    this.projects.forEach(project => {
      console.log(project);

      const projectContainer = document.createElement('DIV');
      projectContainer.classList.add('project-container');
      projectContainer.addEventListener('click', () => window.location.href = project.link)

      const projectTitle = document.createElement('P');
      projectTitle.classList.add('project-title')
      projectTitle.textContent = project.title;

      const description = document.createElement('p');
      description.classList.add('project-description')
      description.textContent = project.description;

      [projectTitle, description].forEach(el => projectContainer.appendChild(el));
      fragment.appendChild(projectContainer);
    })
    this.mainElement.appendChild(fragment)

  }
}
