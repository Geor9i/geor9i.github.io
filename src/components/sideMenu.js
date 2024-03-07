const menuButton = document.querySelector('.menu-button');
const sideMenu = document.querySelector('aside.side-menu');

menuButton.addEventListener('click', () => {
    if (sideMenu.classList.contains('side-menu-closed')) {
        sideMenu.classList.remove('side-menu-closed')
    } else {
        sideMenu.classList.add('side-menu-closed')
    }
})

export class sideMenuComponent {
    constructor() {
        // this.sideMenu = 
    }
}