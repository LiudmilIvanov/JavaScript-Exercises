import { errorHandler, extendContext, getUserData, DB } from '../util.js';
 
 
 export function createPage (context) {
    extendContext(context)
        .then(function () {
            this.partial('./templates/createOffer.hbs');
        })
};

export function editPage(context) {
    const { id } = context.params;

    DB.collection('offers')
        .doc(id)
        .get()
        .then((response) => {
            context.offer = { id, ...response.data() };

            console.log(context.offer)
            extendContext(context)
                .then(function () {
                    this.partial('./templates/editOffer.hbs');
                })
        })
};

export  function detailsPageFunction(context) {
    const { id } = context.params;

    DB.collection('offers').doc(id).get()
        .then((response) => {
            const actualOfferData = response.data();
            const imTheSalesMan = actualOfferData.salesman === getUserData().uid;
            const imInTheClientsList = Boolean(actualOfferData.clients.find((id) => id === getUserData().uid));

            context.offer = { ...actualOfferData, imTheSalesMan, id, imTheSalesMan };

            extendContext(context)
                .then(function () {
                    this.partial('./templates/details.hbs');
                })
        });

};

export function deleteOffer(context) {
    const { id } = context.params;

    DB.collection('offers').doc(id).delete()
        .then(() => {
            this.redirect('#/home');
        }).catch(errorHandler);
};

export function buyPage(context) {
    const { id } = context.params;

    DB.collection('offers')
        .doc(id)
        .get()
        .then((response) => {
            const offerData = { ...response.data() };
            offerData.clients.push(getUserData().uid);

            return DB.collection('offers')
                .doc(id)
                .set(offerData)
        })
        .then(() => {
            this.redirect(`#/details/${id}`)
        })
        .catch(errorHandler);
};


export function createPost(context) {
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
};

 export function editPost(context) {
    const { id, productName, price, brand, description, imageUrl } = context.params;

    DB.collection('offers')
        .doc(id)
        .get()
        .then((response) => {

            return DB.collection('offers')
                .doc(id)
                .set({
                    ...response.data(),
                    productName,
                    price,
                    brand,
                    description,
                    imageUrl,
                })
        })
        .then(() => {
            this.redirect(`#/details/${id}`)
        });
};