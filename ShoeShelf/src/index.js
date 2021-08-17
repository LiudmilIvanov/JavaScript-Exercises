import { buyPage, createPage, createPost, deleteOffer, detailsPageFunction, editPage, editPost } from './controllers/catalog.js';
import { homePage } from './controllers/home.js';
import { registerPage, loginPage, logout, registerPost, loginPost } from './controllers/user.js';
import { getUserData } from './util.js';

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

   /* const user = getUserData();
    this.userData = {
        isLoggedIn: user ? true : false,
        user,
    };*/

    //Home routes

    this.get('/home', homePage);

    //User routes
    this.get('/register', registerPage);

    this.post('/register', registerPost);

    this.get('/login', loginPage);

    this.post('/login', loginPost);

    this.get('/logout', logout);

    //Offers routes

    this.get('/create-offer', createPage);

    this.post('/create-offer', createPost);

    this.get('/edit/:id', editPage);

    this.post('/edit/:id', editPost);

    this.get('/details/:id', detailsPageFunction);

    this.get('/delete/:id', deleteOffer);

    this.get('/buy/:id', buyPage);
});

    app.run('/home');