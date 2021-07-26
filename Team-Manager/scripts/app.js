const UserModel = firebase.auth();

const router = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    //GET

    this.get('#/home', function (context) {
        const userInfo = localStorage.getItem('userInfo');
      
        if (userInfo) {
            const { uid, email} = JSON.parse(userInfo);
            context.loggedIn = true;
            context.email = email;
        }
      
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
        }).then(function () {
            this.partial('../templates/home/home.hbs');
        });
    });

    this.get('#/about', function () {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
        }).then(function () {
            this.partial('../templates/about/about.hbs');
        });
    });

    this.get('#/login', function () {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'loginForm': './templates/login/loginForm.hbs',
        }).then(function () {
            this.partial('../templates/login/loginPage.hbs');
        });
    });

    this.get('/logout', function(context) {
        UserModel.signOut()
            .then((response) => {
                localStorage.removeItem('userInfo');
                context.redirect('#/home')
            }).catch((e) => console.error(e));


    });

    this.get('#/register', function () {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'registerForm': './templates/register/registerForm.hbs',
        }).then(function () {
            this.partial('./templates/register/registerPage.hbs');
        })
    });

    this.get('#/create', function(context) {
        const userInfo = localStorage.getItem('userInfo');
      
        if (userInfo) {
            const { uid, email} = JSON.parse(userInfo);
            context.loggedIn = true;
            context.email = email;
            context.hasNoTeam = true;
        }

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'createForm': './templates/create/createForm.hbs'
        }).then(function() {
            this.partial('./templates/create/createPage.hbs');
        });
    });

    this.get('#/catalog', function(context) {
        const userInfo = localStorage.getItem('userInfo');
      
        if (userInfo) {
            const { uid, email} = JSON.parse(userInfo);
            context.loggedIn = true;
            context.email = email;
            context.hasNoTeam = true;
        }
       
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'team': './templates/catalog/team.hbs',

        }).then(function() {
            this.partial('../templates/catalog/teamCatalog.hbs');
        })

    });

    //POST
    this.post('/register', function (context) {
        const { email, password, repeatPassword } = context.params;
        let err = document.querySelector('#errorBox');

        if (password !== repeatPassword) {
            err.textContent = 'Both passwords do not match.';
            err.style.display = 'block';
            return;
        }
        err.style.display = 'none';


        UserModel.createUserWithEmailAndPassword(email, password)
            .then((createUser) => {

                this.redirect('/login');
            }).catch((e) => console.error(e));
    });

    this.post('/login', function (context) {
        const { email, password } = context.params;

        UserModel.signInWithEmailAndPassword(email, password) 
            .then(({user: {uid, email}}) => {
                localStorage.setItem('userInfo', JSON.stringify({uid, email}));
                this.redirect('#/home');
            }).catch((e) => console.error(e));
    });

    this.post('/create', function(context) {
        const postURL = 'https://team-manager-6454f-default-rtdb.firebaseio.com/teams/.json';
        const { name, comment } = context.params

        let team = {
            name: name, 
            comment :comment
        };

        fetch(postURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(team),
        })
            .then((reponse) => reponse.json)
            .catch((e) => console.error(e));

    });

});

(() => {
    router.run('#/home')
})();