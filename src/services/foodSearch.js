let baseUrl = "https://world.openfoodfacts.net/api/v2/product/";
let responseField = "?fields=product_name,nutriments,selected_images";

const getFoodData = async (productBarcode) => {
    try {
        const res = await fetch(`${baseUrl}${productBarcode}${responseField}`);
        const data = await res.json();
        console.log("foodSearch.js data:", data);
        return data;
    } catch (err) {
        console.log(err);
    }
};

getFoodData('3017624010701')

export {getFoodData};