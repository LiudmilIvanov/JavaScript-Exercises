export default class Home extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        // console.log(this)
        this.innerHTML = 'in home component';


    }
}