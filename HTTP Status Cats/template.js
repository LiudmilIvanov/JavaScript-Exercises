const elements = {
    allCats: () => document.getElementById('allCats'),

};

Promise.all([getTemplate('./template.hbs'),
getTemplate('./cat.hbs')
])
    .then(([tempSource, catSource]) => {
        Handlebars.registerPartial('cat', catSource)
        const template = Handlebars.compile(tempSource);
        const htmlResult = template({ cats });
        elements.allCats().innerHTML = htmlResult;

        attachEventlistener();
    })
    .catch((e) => console.error(e));


function getTemplate(tempLocation) {
    return fetch(tempLocation).then((response) => response.text());
}

function attachEventlistener() {
    elements.allCats().addEventListener('click', (e) => {
        const { target } = e;
        if (target.nodeName === "BUTTON") {
            let divStatus = target.parentNode.querySelector('div.status');

            if (divStatus.style.display == 'none') {
                divStatus.style.display = 'block'
            } else {
            divStatus.style.display = 'none'
            }
        }
    });
}