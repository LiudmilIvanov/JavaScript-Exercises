const elements = {
    allCats: () => document.getElementById('allCats'),

};

Promise.all([getTemplate('./template.hbs'),
             getTemplate('./cat.hbs')                   
])
    .then(([tempSource, catSource]) => {
        Handlebars.registerPartial('cat', catSource)
        const template = Handlebars.compile(tempSource);
        const htmlResult = template({cats});
        
        elements.allCats().innerHTML = htmlResult;
    })
    .catch((e) => console.error(e));



function getTemplate(tempLocation) {
    return fetch(tempLocation).then((response) => response.text());
}