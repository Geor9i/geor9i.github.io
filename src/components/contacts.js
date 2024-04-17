import { eventBus } from "../lib/eventBus.js";

export default class ContactsComponent {
  constructor() {
    this.eventSubscriberId = "contacts";
    this.mainElement = document.querySelector(".wrapper > main #contacts");
    this.eventBus = eventBus;
    this.contacts = [];
    this.activateContact = this._activateContact.bind(this);
    this.init();
  }

  init() {
    this.contacts = [
        {text: 'gurumov93@gmail.com', icon: 'email', id: 'email'},
        {text: 'LinkedIn',  link: 'https://www.linkedin.com/in/georgi-urumov-978768bb/', icon: 'linkedin', id: 'linkedin'},
        {text: 'GitHub', link: 'https://github.com/geor9i', icon: 'github', id: 'github'},
    ];
     this.display();
  }

  display() {
    const fragment = document.createDocumentFragment();
    this.contacts.forEach(contact => {
      const contactsContainer = document.createElement('div');
      contactsContainer.classList.add('contact-container');
      contactsContainer.addEventListener('click', (e) => this.activateContact(contact.id, e))

      const imgContainer = document.createElement('div');
      imgContainer.classList.add('img-container');

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.classList.add('svg');
        
      const path ='./svg/sprite.svg'
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `${path}#${contact.icon}`);

      svg.appendChild(use);
      imgContainer.appendChild(svg);

      const text = document.createElement('P');
      text.textContent = contact.text;

      contactsContainer.appendChild(imgContainer);
      contactsContainer.appendChild(text);
      fragment.appendChild(contactsContainer);
    });

    this.mainElement.appendChild(fragment);
  }

  _activateContact(id, e) {
    const data = this.contacts.find(el => el.id === id);
    if (data) {
      if (data.hasOwnProperty('link')) {
        window.location.href = data.link
      } else {
        navigator.clipboard.writeText(data.text);
        const notifier = document.createElement('P');
        notifier.textContent = 'Text Copied!'
        notifier.classList.add('clipboard-notify');
        notifier.style.top = (e.clientY - 60) + 'px'
        notifier.style.left = (e.clientX - 60) + 'px'
        document.body.appendChild(notifier);
        const ref = setInterval(() => {
          notifier.classList.add('clipboard-notify-disapear')
          clearInterval(ref);
          const deleteRef = setInterval(() => {
            notifier.remove();
            clearInterval(deleteRef);
          }, 1000)
        }, 1000)
      }
    }
  }
}
