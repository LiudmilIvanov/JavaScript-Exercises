const UserModel = firebase.auth();
const DB = firebase.firestore();

console.log(UserModel)

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    //Home routes

    this.get('/home', function (context) {
        DB.collection('offers')
            .get()
            .then((response) => {
                context.offers = [];
                response.forEach((offer) => {
                    context.offers.push({ id: offer.id, ...offer.data() });
                });

                extendContext(context)
                    .then(function () {
                        this.partial('./templates/home.hbs');
                    });
            }).catch(errorHandler);



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

    this.get('/logout', function () {
        UserModel.signOut()
            .then((response) => {
                clearUserData();

                this.redirect('/home');
            }).catch(errorHandler);

    });

    //Offers routes

    this.get('/create-offer', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/createOffer.hbs');
            })

    });

    this.post('create-offer', function (context) {
        const { productName, price, imageUrl, description, brand } = context.params;

        DB.collection('offers').add({
            productName,
            price,
            imageUrl,
            description,
            brand,
            selesman: getUserData().uid,
        })
            .then((createdProduct) => {

                this.redirect('/home');

            }).catch(errorHandler);



    });

    this.get('/edit-offer/:id', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/editOffer.hbs');
            })
    });

    this.get('/details/:id', function (context) {
        const { id } = context.params;

        DB.collection('offers').doc(id).get()
            .then((response) => {
                const actualOfferData = response.data();
                const imTheSalesMan = actualOfferData.salesman === getUserData().uid;

                context.offer = { ...actualOfferData, imTheSalesMan };

                extendContext(context)
                    .then(function () {
                        this.partial('./templates/details.hbs');
                    })
            });

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
};

function clearUserData() {
    localStorage.removeItem('user');
};


(() => {
    app.run('/home');
})();