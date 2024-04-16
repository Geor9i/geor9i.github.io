import { eventBus } from "../lib/eventBus.js";

export default class MainComponent {
    constructor() {
        this.eventSubscriberId = 'main';
        this.mainElement = document.querySelector(".wrapper main");
        this.eventBus = eventBus;
        this.initScoll();
    }


    initScoll() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle('show', entry.isIntersecting)
            })
        }, {
            threshold: 0.8
        })
        const sections = this.mainElement.querySelectorAll('main > section');
        sections.forEach(section => observer.observe(section))
    }
}