const app = Sammy('#root', function() {

    this.use('Handlebars', 'hbs');

    this.get('/home', function() {
        this.loadPartial('./templates/homeGuest.hbs');
    });

});




(() => {
  app.run('/');
})();