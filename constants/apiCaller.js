import { Product } from "../Class/Product";

const fetchData = async (upcCode) => {
    const appKey = process.env.APP_KEY;
    const language = 'es';

    try {
        const response = await fetch(`https://www.digit-eyes.com/gtin/v2_0/?upcCode=${upcCode}%20&field_names=description,%20usage,%20price,%20image&language=${language}&app_key=${appKey}&signature=${process.env.SIGNATURE}`);
        const data = await response.json();
        const { description, image, prices, usage } = data;

        const mxnOffers = prices.offers.find(offer => offer.currencyCode === 'MXN');
        const { price } = mxnOffers;

       /*  console.log('nombre:', description);
        console.log('Image:', image);
        console.log('Price:', price);
        console.log('Description:', usage); */

        const product = new Product(description, usage, price, 1, image);
        // El objeto product ya está actualizado en el contexto
        return product;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default fetchData;
