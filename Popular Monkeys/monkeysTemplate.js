const elements = {
    section: () => document.querySelector('.monkeys'),
    button: () => document.querySelector('.monkeys button'),
    pElement: () => document.querySelector('.monkeys p')
};

function attachInfo() {
    getTemplate('./monkey.hbs')
        .then((template) => {
            const temp = Handlebars.compile(template);
            const htmlResult = temp({ monkeys });
            elements.section().innerHTML = htmlResult;

            attachEventListerner();

        }).catch((e) => console.error(e));
}

function getTemplate(templateSrc) {
    return fetch(templateSrc).then((response) => response.text());
}

function attachEventListerner() {
    elements.section().addEventListener('click', (e) => {
        const { target } = e;

        if (target.nodeName === 'BUTTON') {
            let parapgraph = target.parentNode.querySelector('p');
            parapgraph.style.display == 'block'
           
            if (parapgraph.style.display === 'none') {
                parapgraph.style.display = 'block'
            } else {
                parapgraph.style.display = 'none'
            }
            parapgraph.display == 'block'
        }
    })
}

attachInfo();