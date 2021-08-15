import { errorHandler, extendContext, DB } from '../util.js';

export function homePage(context) {
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

};