import { errorHandler, extendContext, DB } from '../util.js';

export async function homePage(context) {
    let offers;
    try {
        const response = await DB.collection('offers').get();
        offers = response.docs.map((offer) => ({ id: offer.id, ...offer.data() }));

    } catch (err) {
        errorHandler(err);
    }

    await extendContext(context);
    this.partial('./templates/home.hbs', offers);

    /*    .then((response) => {
            context.offers = [];
            response.forEach((offer) => {
                context.offers.push({ id: offer.id, ...offer.data() });
            });
 
            extendContext(context)
                .then(function () {
                    this.partial('./templates/home.hbs');
                });
        }).catch(errorHandler);*/

};
