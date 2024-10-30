import React, { useEffect, useState } from "react";
import { logFoodData } from "../../services/airTableService";
import { getFoodDataBySearchQueries } from "../../services/foodSearch";
import { fetchFoodLog } from "../../services/airTableService";
import FoodSearch from "./foodSearch/FoodSearch";
import "./addFoodModal.css";

const AddFoodModal = ({ toggleModal, getFoodLog}) => {
    const [searchResults, setSearchResults] = useState([]);

    const getSearchResults = async (category) => {
        try {
            const data = await getFoodDataBySearchQueries(category);
            const newSearchResults = data.products;
            console.log("This is the search results:", newSearchResults);
            setSearchResults(newSearchResults);
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    // restructuredSearchResultsData 1) extracts the necessary data from response object and 2) recompute the nutritional value to 1 gram and to 3 decimals point
    const restructuredSearchResultsData = searchResults.map((item) => ({
        productCode: item.code,
        productName: item.product_name,
        productKcal: Math.ceil((item.nutriments["energy-kcal"] / 100) * 1000) / 1000,
        productCarbs: Math.ceil((item.nutriments.carbohydrates / 100) * 1000) / 1000,
        productSugars: Math.ceil((item.nutriments.sugars / 100) * 1000) / 1000,
        productProteins: Math.ceil((item.nutriments.proteins / 100) * 1000) / 1000,
        productFats: Math.ceil((item.nutriments.fat / 100) * 1000) / 1000,
        productImage: item.selected_images.front.small.en,
    }));

    // map and display search results that is clickable
    const searchResultsPanel = restructuredSearchResultsData.map((searchResult) => (
        <div className="result" onClick={() => handleClick(searchResult)} key={searchResult.productCode}>
            {searchResult.productName}
        </div>
    ));

    const [selectedResult, setSelectedResults] = useState({});
    const [servingSize, setServingSize] = useState(1);
    const [selectedResultAdjustedServings, setSelectedResultAdjustedServings] = useState({});

    useEffect(() => {
        if (Object.keys(selectedResult).length > 0) {
            updateNutritionalValueBasedOnServing(servingSize);
        }
    }, [selectedResult, servingSize]);

    const handleClick = (searchResult) => {
        setSelectedResults(searchResult);
        console.log("this is the selected food product", selectedResult);
        updateNutritionalValueBasedOnServing(servingSize);
    };

    console.log("Selected Result Adjusted Servings:", selectedResultAdjustedServings);
    console.log("Serving Size:", servingSize);
    console.log("Selected Result:", selectedResult);

    const handleServingSizeInput = (e) => {
        const newServingSize = e.target.value;
        setServingSize(newServingSize);
        updateNutritionalValueBasedOnServing(newServingSize); // passing down the serving size value directly
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
        console.log("updated nutritional value based on serving size:", newNutritionalValue);
    };

    const handleAddFood = async () => {
        if (!Object.keys(selectedResult).length || !servingSize || !Object.keys(selectedResultAdjustedServings).length)
            return;
        const selectedResultWithServingSize = {
            ...selectedResult,
            loggedServingSize: servingSize,
        };
        try {
            console.log("Food data before loggin - searchResult", selectedResultWithServingSize);
            await logFoodData(selectedResultWithServingSize);
            toggleModal();
            getFoodLog();
        } catch (error) {
            console.log("error logging data", error.message);
        }
    };

    return (
        <>
            <FoodSearch getSearchResults={getSearchResults} />

            <h2>Search Results</h2>

            <div className="results-panel">{searchResultsPanel}</div>

            <div className="food-details">
                {selectedResult.productImage && <img src={selectedResult.productImage} alt="Product Image" />}
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
                    {selectedResultAdjustedServings?.productProteins !== undefined
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

export default AddFoodModal;
