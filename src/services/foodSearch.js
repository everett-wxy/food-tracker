const baseUrlSearchQueries = "https://world.openfoodfacts.net/api/v2/search?";
const searchQueriesResponseFields =
    "fields=product_name,code,selected_images,nutriments,serving_size";
const searchQeuriesParameters = "&states_tags=complete&sort_by=popularity_key&page_size=20";
const searchQueryCategories = `&categories_tags=`;

const getFoodDataBySearchQueries = async (searchQueryCategoriesValue) => {
    try {
        const res = await fetch(
            `${baseUrlSearchQueries}${searchQueriesResponseFields}${searchQeuriesParameters}${searchQueryCategories}${searchQueryCategoriesValue}`
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
                `Error ${res.status}: ${
                    errorData.error.message || response.statusText
                }`
            );
        }
        const data = await res.json();
        console.log("getFoodDataBySearchQueries:", data);
        return data;
    } catch (err) {
        console.log("error:", err);
    }
};

// getFoodDataBySearchQueries("chocolate");

export { getFoodDataBySearchQueries };

// const baseUrlBarcode = "https://world.openfoodfacts.net/api/v2/product/";
// const barCodeResponseFields = "?fields=product_name,nutriments,selected_images";

// const getFoodDataByBarcode = async (productBarcode) => {
//     try {
//         const res = await fetch(
//             `${baseUrlBarcode}${productBarcode}${barCodeResponseFields}`
//         );
//         if (!res.ok) {
//             const errorData = await res.json();
//             throw new Error(
//                 `Error ${res.status}: ${
//                     errorData.error.message || response.statusText
//                 }`
//             );
//         }
//         const data = await res.json();
//         console.log("getFoodDataByBarcode:", data);
//         return data;
//     } catch (err) {
//         console.log(err);
//     }
// };

// getFoodDataByBarcode(3017624010701);

// export { getFoodDataByBarCode };
