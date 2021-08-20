export default class Register extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = 'I am in Register component';
    }
}