import { eventBus } from "../lib/eventBus.js";

export default class TechnologiesComponent {
  constructor() {
    this.eventSubscriberId = "techologies";
    this.mainElement = document.querySelector(".wrapper > main #technologies");
    this.eventBus = eventBus;
    this.display()
  }

  _stackLoader() {
    const path = `../../icons`;
    return [
      { name: "JavaScript", src: `${path}/js.png` },
      { name: "HTML", src: `${path}/html-5.png` },
      { name: "CSS", src: `${path}/social.png` },
      { name: "TypeScript", src: `${path}/typescript.png` },
      { name: "React", src: `${path}/atom.png` },
      { name: "Angular", src: `${path}/angular.png` },
      { name: "MongoDB", src: `${path}/database.png` },
    ];
  }

  display() {
    this.techStack = this._stackLoader();
    const parent = this.mainElement.querySelector('#technologies .tech-stack')
    let fragment = document.createDocumentFragment()
    this.techStack.forEach(tech => {
        const container = document.createElement('DIV');
        container.className = 'tech';
        const innerWrapper = document.createElement('DIV');
        const p = document.createElement('P');
        const img = document.createElement('IMG');
        p.textContent = tech.name;
        img.setAttribute('src', tech.src);
        innerWrapper.appendChild(p);
        innerWrapper.appendChild(img);
        container.appendChild(innerWrapper);
        fragment.appendChild(container);
    })
    parent.appendChild(fragment)
  }
}
