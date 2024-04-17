import { eventBus } from "../lib/eventBus.js";

export default class SummaryComponent {
  constructor() {
    this.eventSubscriberId = "summary";
    this.mainElement = document.querySelector(".wrapper > main #summary");
    this.eventBus = eventBus;
    // this.innerScroll = this._innerScroll.bind(this);
    // this.children = [];
    // this.timeOutRef = null;
    // this.init()
  }

  // init() {
    // this.children = Array.from(this.mainElement.children);
    // this.children.forEach(child => child.classList.add('fade'))
    // this.eventBus.subscribe(this.eventSubscriberId, 'scrollElement', this.innerScroll)
  // }
//   _innerScroll(e) {
//     const observer = e.detail;
//     this.clearTimeOut();

//     if (observer.isIntersecting) {
//         let children = [...this.children];
//         this.timeOutRef = setInterval(() => {
//             let child = children.shift();
//             console.log(child);
//             if (!child) {
//                 this.clearTimeOut()
//             } else {
//                 child.classList.remove('fade')
//             }
//         }, 150)
//     } else {
//         this.children.forEach(child => child.classList.add('fade'));
//     }
// }

  // clearTimeOut() {
  //   clearInterval(this.timeOutRef);
  // }

}
