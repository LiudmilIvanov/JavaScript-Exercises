const UserModel = firebase.auth();

console.log(UserModel)

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    //Home routes

    this.get('/home', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/homeGuest.hbs');
            });

    });

    //User routes
    this.get('/register', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/register.hbs');
            });

    });

    this.post('/register', function (context) {
        const { email, password, rePassword } = context.params;

        if (password !== rePassword) {
            return;
        }

        UserModel.createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                console.log(userData)

                this.redirect('/home');
            }).catch((e) => console.log(e));


    });


    this.get('/login', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/login.hbs');
            });
    });

    this.post('/login', function (context) {
        const { email, password } = context.params;

        UserModel.signInWithEmailAndPassword(email, password)
            .then((userData) => {
                saveUserData(userData);

                this.redirect('/home');

            }).catch(errorHandler);


    });

    this.get('/logout' , function() {
        UserModel.signOut()
            .then((response) => {

            }).catch(errorHandler);

    });

    //Offers routes

    this.get('/create-offer', function () {
        this.partial('./templates/createOffer.hbs');
    });

    this.get('/edit-offer', function () {
        this.partial('./templates/editOffer.hbs');
    });

    this.get('/details', function () {
        this.partial('./templates/details.hbs');
    });

});

function extendContext(context) {
    const user = getUserData();
    context.isLoggedIn = Boolean(getUserData());
    context.email = user ? user.email : '';
    
    return context.loadPartials({
        'header': './partials/header.hbs', 
        'footer': './partials/footer.hbs',
    })
};

function errorHandler(error) {
    console.log(error);
};

function saveUserData(data) {
    const { user: { email, uid } } = data;
    localStorage.setItem('user', JSON.stringify({ email, uid }));
};

function getUserData() {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}


(() => {
    app.run('/home');
})();