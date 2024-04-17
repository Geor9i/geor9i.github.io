import { eventBus } from "../lib/eventBus.js";

export default class LanguagesComponent {
    constructor() {
        this.eventSubscriberId = 'languages';
        this.mainElement = document.getElementById("languages");
        this.eventBus = eventBus;
        this.languages = [];
        this.init();
    }

    init() {

        // this.eventBus.subscribe(this.eventSubscriberId, 'scrollElement', (e) => {
        //     // console.log(e);
        // })

        this.languages = [
            {lang: 'Bulgarian', level: 'Mother tongue'},
            {lang: 'English', level: 'Proficient'},
            {lang: 'German', level: 'Intermediate'},
            {lang: 'Icelandic', level: 'Basic'},
        ];
        const container = this.mainElement.querySelector('.language-container');

        this.languages.forEach(entry => {

        })

        
    }


}