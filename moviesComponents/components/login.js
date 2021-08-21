import { Router } from 'https://unpkg.com/@vaadin/router';
import { html, render } from 'https://unpkg.com/lit-html?module';
import { login } from '../services/authServices.js';


const template = (ctx) => html`

<form class="text-center border border-light p-5" action="" method="" @submit=${ctx.onSubmit}>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" placeholder="Email" name="email" value="">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value="">
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
</form>

`;

export default class Login extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);

        let email = formData.get('email');
        let password = formData.get('password');
        // let repeatPassword = formData.get('repeatPassword');


        login(email, password)
            .then((res) => {
                notify('successful login!', 'success');
                Router.go('/');
                //TODO redirect to home.
            })
            .catch(err => {
                notify(err.message, 'success');
            })
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}