const router = Sammy('#main', function(){

    this.use('Handlebars', 'hbs');

    this.get('#/home', function() {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
        }).then(function() {
            this.partial('../templates/home/home.hbs');
        });
    });

    this.get('#/login', function() {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'loginForm': './templates/login/loginForm.hbs',
        }).then(function() {
            this.partial('../templates/login/loginPage.hbs');
        });
    });




});

(() => {
    router.run('#/home')
})();

