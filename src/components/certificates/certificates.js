import { eventBus } from "../../lib/eventBus.js";
import { certificates } from "./certificatesList.js";

export default class CertificatesComponent {
  constructor() {
    this.eventSubscriberId = "certificates";
    this.imageElement = document.querySelector("#certificates .frame .img img");
    this.eventBus = eventBus;
    this.arrowLeft = document.querySelector(".arrow.left");
    this.arrowRight = document.querySelector(".arrow.right");
    this.certificates = certificates;
    this.certificateIndex = 1;
    this.display = this._display.bind(this);
    this.display();
    this.changeImage()
  }

  _display() {
    this.imageElement.setAttribute('src', `./certificates/${Object.values(this.certificates)[this.certificateIndex]}`);
  }

  changeImage() {
    eventBus.subscribe(this.eventSubscriberId, "click", (e) => {
      const arrSize = Object.keys(this.certificates).length - 1;
      if (e.target === this.arrowRight) {
        this.certificateIndex++
         if (this.certificateIndex > arrSize) {
          this.certificateIndex = 0;
         }
      } else {
        this.certificateIndex--
        if (this.certificateIndex < 0) {
          this.certificateIndex = arrSize;
         }
      }

      this.display();
    }, {
      target: [this.arrowLeft, this.arrowRight],
    });
  }
}
