const apiKey = import.meta.env.VITE_TOKEN;

const baseId = "appnXQbYNcFK7Qhia"; // Replace with your Base ID
const tableName = "tblpCLpnsIttydHsB"; // Replace with your table name
const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

const fetchFoodLog = async () => {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
            },
        });

        //check if response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Error ${response.status}: ${
                    errorData.error.message || response.statusText
                }`
            );
        }

        const data = await response.json();
        console.log("Fetched records test:", data.records);
        return data.records;
    } catch (error) {
        console.log("Error fetching records:", error.message);
    }
};

const logFoodData = async (foodData) => {
    const data = {
        fields: {
            FoodName: foodData.productName,
            Kcal: foodData.productKcal,
            Carbs: foodData.productCarbs,
            Proteins: foodData.productProteins,
            Fats: foodData.productFats,
            ImageURL: foodData.productImage,
        },
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Record saved:", result);
    } catch (error) {
        console.log("Error saving record", error);
    }
};

// logFoodData(foodData);
// fetchFoodLog();
fetchFoodLog();

export { logFoodData, fetchFoodLog };

// { headers: {authorization: "Bearer" + import.meta.env.VITE_TOKEN}}
