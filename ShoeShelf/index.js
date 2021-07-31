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

                this.redirect('/home');

            }).catch(errorHandler);


    })

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
    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs',
    })
};

function errorHandler(error) {
    console.log(error);
};


(() => {
    app.run('/home');
})();