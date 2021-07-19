const elements = {
    
    input: () => document.querySelector('input#towns'),
    button: () => document.querySelector('button#btnLoadTowns'),
    root: () => document.querySelector('div#root'),

};

elements.button().addEventListener('click', getInputInformaiton);

function getInputInformaiton(e) {
    e.preventDefault();
    const { value: towns } = elements.input();
    appendTowns(towns);
};

function appendTowns(towns) {
    getTemplate()
        .then((templateSource) => {
          //  console.log(templateSource)



        });

};

function getTemplate() {
    return fetch('./template.hbs').then((response) => response.text());
}