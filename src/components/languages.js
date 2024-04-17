import { eventBus } from "../lib/eventBus.js";

export default class LanguagesComponent {
    constructor() {
        this.eventSubscriberId = 'languages';
        this.mainElement = document.getElementById("languages");
        this.eventBus = eventBus;
        this.linesCount = 40;
        this.strokeWidth = 6;
        this.isDrawing = false;
        this.languages = [
            {lang: 'Bulgarian', level: 100, title:  'Native'},
            {lang: 'English', level: 80, title:  'Proficient'},
            {lang: 'German', level: 35, title:  'Intermediate'},
            {lang: 'Icelandic', level: 15, title:  'Basic'},
        ];
        this.init();
    }

    init() {
        this.displayElements();
        this.eventBus.subscribe(this.eventSubscriberId, 'scrollElement', (e) => {
            const observer = e.detail;
            const section = observer.target;
            const id = section.id;
            if (id === 'languages' && observer.isIntersecting && !this.isDrawing) {
                this.isDrawing = true;
                this.drawSVG();
            }
        })
    }

    displayElements() {
        const parent = this.mainElement.querySelector('#languages > .main-lang-container');
        const fragment = document.createDocumentFragment();
        this.languages.forEach(entry => {
            const langContainer = document.createElement('DIV');
            langContainer.classList.add('lang-container');

            const langName = document.createElement('P');
            langName.textContent = entry.lang;

            const graphContainer = document.createElement('DIV');
            graphContainer.classList.add('graph-container');

            const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgContainer.classList.add('lang-level');
            svgContainer.id = entry.lang.toLowerCase();

            const level = document.createElement('P');
            level.textContent = entry.title;

            level.style.color = this.getProgressColor(entry.level, true);

            [svgContainer, level].forEach(el => graphContainer.appendChild(el));
            [langName, graphContainer].forEach(el => langContainer.appendChild(el));
            fragment.appendChild(langContainer);
        })
        parent.appendChild(fragment)
    }


    drawSVG() {
        let totalLinesToDraw = this.languages.reduce((acc, curr) => acc + Math.floor(this.linesCount * (curr.level / 100)), 0);
    
        this.languages.forEach(entry => {
            const svg = document.getElementById(`${entry.lang.toLowerCase()}`);
            const { width, height } = svg.getBoundingClientRect();
            svg.innerHTML = '';
            const lineCount = Math.floor(this.linesCount * (entry.level / 100));
            const lineArr = Array.from({ length: lineCount }, (_, i) => i);
    
            const ref = setInterval(() => {
                const lineIndex = lineArr.shift();
                if (lineIndex !== undefined) {
                    const graphLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    const x1 = (width / this.linesCount) * lineIndex + this.strokeWidth / 2;
                    const x2 = (width / this.linesCount) * lineIndex + this.strokeWidth / 2;
                    graphLine.setAttribute("x1", x1); 
                    graphLine.setAttribute("x2", x2);
                    graphLine.setAttribute("y1", height); 
                    graphLine.setAttribute("y2", Math.floor(height - ((height / this.linesCount) * (lineIndex + 1)))); 
                    graphLine.setAttribute("stroke", this.getProgressColor(lineIndex));
                    graphLine.setAttribute("stroke-width", `${this.strokeWidth}`); 
                    svg.appendChild(graphLine);
    
                    totalLinesToDraw--;
                    if (totalLinesToDraw === 0) {
                        this.isDrawing = false;
                    }
                } else {
                    clearInterval(ref);
                }
            }, 100);
        });
    }
    
    
    

    

    getProgressColor(value, takeValue = false) {
        const progress = takeValue ? value : (value / this.linesCount) * 100;
        if (progress < 20) {
            return '#fb4b4b';  
        } else if (progress < 40) {
            return '#ffa879';  
        } else if (progress < 60) {
            return '#ffc163'; 
        } else {
            return '#2cf554'; 
        }
    }
    
    
    
    
    

}
