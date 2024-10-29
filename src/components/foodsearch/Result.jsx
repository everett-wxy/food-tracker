import React, { useState } from "react";
import { logFoodData } from "../../services/airTableService";

const Result = ({ searchResults }) => {
    const [selectedResult, setSelectedResults] = useState({});

    const handleClick = (searchResult) => {
        setSelectedResults(searchResult);
    };

    const handleAddFood = async () => {
        if (!selectedResult) return;

        const foodDataToBeLogged = {
            productName: selectedResult.product_name,
            productKcal: selectedResult.nutriments.energy,
            productCarbs: selectedResult.nutriments.carbohydrates,
            productSugars: selectedResult.nutriments.sugars,
            productProteins: selectedResult.nutriments.proteins,
            productFats: selectedResult.nutriments.fat,
            productImage: selectedResult.selected_images.front.small.en,
        };

        try {
            console.log("Food data before loggin", foodDataToBeLogged);
            await logFoodData(foodDataToBeLogged);
        } catch (error) {
            console.log("error logging data", error.message);
        }
    };

    const searchResultsPanel = searchResults.map((searchResult) => (
        <div
            className="result"
            onClick={() => handleClick(searchResult)}
            key={searchResult.code}
        >
            {searchResult.product_name}
        </div>
    ));

    return (
        <>
            <div className="results-panel">{searchResultsPanel}</div>
            <div className="food-details">
                {selectedResult.selected_images?.front?.small?.en && (
                    <img
                        src={selectedResult.selected_images.front.small.en}
                        alt="Product Image"
                    />
                )}
                <p>{selectedResult.product_name}</p>
                <p>Serving size: {selectedResult?.serving_size || "N/A"}</p>
                <p>
                    Kcal:{" "}
                    {selectedResult.nutriments?.["energy-kcal_serving"] ||
                        "N/A"}{" "}
                </p>
                <p>
                    Carbs:{" "}
                    {selectedResult.nutriments?.["carbohydrates_serving"] ||
                        "N/A"}
                </p>
                <p>
                    Sugars:{" "}
                    {selectedResult.nutriments?.["sugars_serving"] || "N/A"}
                </p>
                <p>
                    Proteins:{" "}
                    {selectedResult.nutriments?.["proteins_serving"] || "N/A"}
                </p>
                <p>
                    Fat: {selectedResult.nutriments?.["fat_serving"] || "N/A"}
                </p>
                <button onClick={handleAddFood}>Add Food</button>
            </div>
            <div></div>
        </>
    );
};

export default Result;
