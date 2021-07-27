const routes = {
    'login': 'login-form-template',
    'register': 'register-form-template',
};

const router = (path) => {
    let app = document.getElementById('app');
    let template = Handlebars.compile(document.getElementById(routes[path]).innerHTML);

    app.innerHTML = template();
    
}

