import { eventBus } from "../lib/eventBus.js";

export default class MainComponent {
    constructor() {
        this.eventSubscriberId = 'main';
        this.mainElement = document.querySelector(".wrapper main");
        this.eventBus = eventBus;
        this.initScoll();
        // this.scroll();
    }


    // scroll() {
    //     this.eventBus.subscribe(this.eventSubscriberId, 'scroll', (e) => {
    //         console.log(e);
    //     }, {target: this.mainElement})
    // }


    initScoll() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle('show', entry.isIntersecting)
            })
        }, {
            threshold: 1
        })
        const sections = this.mainElement.querySelectorAll('main > section');
        sections.forEach(section => observer.observe(section))
    }
}