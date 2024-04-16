import { eventBus } from "../../lib/eventBus.js";
import { certificates } from "./certificatesList.js";

export default class CertificatesComponent {
  constructor() {
    this.eventSubscriberId = "certificates";
    this.imageElement = document.querySelector("#certificates .frame .img-container img");
    this.eventBus = eventBus;
    this.arrowLeft = document.querySelector("#certificates .frame .arrow.left .left-img");
    this.arrowRight = document.querySelector("#certificates .frame .arrow.right .right-img");
    this.certificates = certificates;
    this.certificateIndex = 0;
    this.display = this._display.bind(this);
    this.openCertificate = this._openCertificate.bind(this);
    this.closeCertificate = this._closeCertificate.bind(this);
    this.backdrop = null;
    this.certificateFrame = null;
    this.display();
    this.init()
  }

  _display() {
    this.imageElement.setAttribute('src', `./certificates/${Object.values(this.certificates)[this.certificateIndex].src}`);
  }

  init() {
    this.eventBus.subscribe(this.eventSubscriberId, "click", (e) => {
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

    this.eventBus.subscribe(this.eventSubscriberId, "click", this.openCertificate, {target: this.imageElement} )

  }

  _openCertificate(){
    this.certificateFrame = document.createElement('DIV');
    this.certificateFrame.classList.add('open-certificate');
    const a = document.createElement('A');
    a.setAttribute('href', `${Object.values(this.certificates)[this.certificateIndex].link}`)
    const img = document.createElement('IMG');
    img.setAttribute('src', `./certificates/${Object.values(this.certificates)[this.certificateIndex].src}`);
    a.appendChild(img);
    this.certificateFrame.appendChild(a);
    document.body.appendChild(this.certificateFrame);

    this.backdrop = document.createElement('DIV');
    this.backdrop.classList.add('certificate-backdrop');
    this.backdrop.addEventListener('click', this.closeCertificate)
    document.body.appendChild(this.backdrop);
    document.body.classList.add('lock');
  }

  _closeCertificate() {
      this.certificateFrame.remove();
      this.certificateFrame = null;
      this.backdrop.remove();
      this.backdrop = null;
      document.body.classList.remove('lock');
  }
}
