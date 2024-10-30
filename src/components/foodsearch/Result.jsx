import React, { useState } from "react";
import { logFoodData } from "../../services/airTableService";

const Result = ({ searchResults }) => {
    // restructuredSearchResultsData 1) extracts the necessary data from response object and 2) recompute the nutritional value to 1 gram
    const restructuredSearchResultsData = searchResults.map((item) => ({
        productCode: item.code,
        productName: item.product_name,
        productKcal: item.nutriments["energy-kcal"] / 100,
        productCarbs: item.nutriments.carbohydrates / 100,
        productSugars: item.nutriments.sugars / 100,
        productProteins: item.nutriments.proteins / 100,
        productFats: item.nutriments.fat / 100,
        productImage: item.selected_images.front.small.en,
    }));

    const searchResultsPanel = restructuredSearchResultsData.map(
        (searchResult) => (
            <div
                className="result"
                onClick={() => handleClick(searchResult)}
                key={searchResult.productCode}
            >
                {searchResult.productName}
            </div>
        )
    );

    const [selectedResult, setSelectedResults] = useState({});
    const [servingSize, setServingSize] = useState(1);
    const [selectedResultAdjustedServings, setSelectedResultAdjustedServings] =
        useState({});

    const handleClick = (searchResult) => {
        setSelectedResults(searchResult);
        console.log("this is the selected food product", selectedResult);
    };

    const handleServingSizeInput = (e) => {
        setServingSize(e.target.value);
        updateNutritionalValueBasedOnServing(e.target.value); // passing down the serving size value directly
    };

    const updateNutritionalValueBasedOnServing = (servingSize) => {
        const newNutritionalValue = {
            ...selectedResult,
            productKcal: (selectedResult.productKcal * servingSize).toFixed(2),
            productCarbs: (selectedResult.productCarbs * servingSize).toFixed(2),
            productProteins: (selectedResult.productProteins * servingSize).toFixed(2),
            productSugars: (selectedResult.productSugars * servingSize).toFixed(2),
            productFats: (selectedResult.productFats * servingSize).toFixed(2),
        };
        setSelectedResultAdjustedServings(newNutritionalValue);
        console.log(
            "updated nutritional value based on serving size:",
            newNutritionalValue
        );
    };

    const handleAddFood = async () => {
        if (!selectedResult) return;
        try {
            console.log("Food data before loggin", selectedResult);
            // await logFoodData(selectedResult);
        } catch (error) {
            console.log("error logging data", error.message);
        }
    };

    return (
        <>
            <div className="results-panel">{searchResultsPanel}</div>

            <div className="food-details">
                {selectedResult.productImage && (
                    <img
                        src={selectedResult.productImage}
                        alt="Product Image"
                    />
                )}
                <p>{selectedResult.productName}</p>
                <p>
                    Kcal:{" "}
                    {selectedResultAdjustedServings?.productKcal !== undefined
                        ? selectedResultAdjustedServings.productKcal
                        : selectedResult?.productKcal !== undefined
                        ? selectedResult.productKcal
                        : "N/A"}
                </p>
                <p>
                    Carbs:{" "}
                    {selectedResultAdjustedServings?.productCarbs !== undefined
                        ? selectedResultAdjustedServings.productCarbs
                        : selectedResult?.productCarbs !== undefined
                        ? selectedResult.productCarbs
                        : "N/A"}
                </p>
                <p>
                    Sugars:{" "}
                    {selectedResultAdjustedServings?.productSugars !== undefined
                        ? selectedResultAdjustedServings.productSugars
                        : selectedResult?.productSugars !== undefined
                        ? selectedResult.productSugars
                        : "N/A"}
                </p>
                <p>
                    Proteins:{" "}
                    {selectedResultAdjustedServings?.productProteins !==
                    undefined
                        ? selectedResultAdjustedServings.productProteins
                        : selectedResult?.productProteins !== undefined
                        ? selectedResult.productProteins
                        : "N/A"}
                </p>
                <p>
                    Fat:{" "}
                    {selectedResultAdjustedServings?.productFats !== undefined
                        ? selectedResultAdjustedServings.productFats
                        : selectedResult?.productFats !== undefined
                        ? selectedResult.productFats
                        : "N/A"}
                </p>
                <label htmlFor="servingSize">Serving in grams: </label>
                <input
                    name="servingSize"
                    id="servingSize"
                    type="number"
                    value={servingSize}
                    onChange={handleServingSizeInput}
                ></input>
                <br />
                <button onClick={handleAddFood}>Add Food</button>
            </div>
        </>
    );
};

export default Result;

// selectedResultAdjustedServings?.productKcal !== undefined ? selectedResultAdjustedServings.productKcal : selectedResult?.productKcal !== undefined ? selectedResult.productKcal : "N/A"