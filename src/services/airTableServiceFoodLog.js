const apiKey = import.meta.env.VITE_TOKEN;

const baseId = "appnXQbYNcFK7Qhia"; // Replace with your Base ID
const tableName = "tblpCLpnsIttydHsB"; // Replace with your table name
const parameters = "?sort[0][field]=LinkedDate&sort[0][direction]=desc"
const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

const fetchFoodLog = async () => {
    try {
        const response = await fetch(url+parameters, {
            headers: {
                Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
            },
        });

        //check if response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message || response.statusText}`);
        }

        const data = await response.json();
        return data.records;
    } catch (error) {
        console.log("Error fetching records:", error.message);
    }
};

const logFoodData = async (foodData) => {
    const data = {
        fields: {
            FoodName: foodData.productName,
            KcalPerGram: foodData.productKcal,
            CarbsPerGram: foodData.productCarbs,
            SugarsPerGram: foodData.productSugars,
            ProteinsPerGram: foodData.productProteins,
            FatsPerGram: foodData.productFats,
            LoggedServingSize: Number(foodData.loggedServingSize),
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
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message || response.statusText}`);
        }
        const result = await response.json();
    } catch (error) {
        console.log("Error saving record", error);
    }
};

const deleteFoodItem = async (recordId) => {
    try {
        const deleteUrl = `${url}/${recordId}`; // Append recordId to the base URL
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message || response.statusText}`);
        }
    } catch (error) {
        console.log("Error deleting record:", error.message);
    }
};

const updateFoodItem = async (recordId, loggedServingSize) => {
    const updateUrl = `${url}/${recordId}`; // Append recordId to the base URL

    const data = {
        fields: {
            LoggedServingSize: Number(loggedServingSize), // Only update the LoggedServingSize field
        },
    };

    try {
        const response = await fetch(updateUrl, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message || response.statusText}`);
        }

        const result = await response.json();
    } catch (error) {
        console.log("Error updating record:", error.message);
    }
};


export { logFoodData, fetchFoodLog, deleteFoodItem, updateFoodItem };
