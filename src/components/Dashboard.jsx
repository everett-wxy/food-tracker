import React, { useState } from "react";
import FoodSearch from "./foodsearch/FoodSearch";
import { getFoodDataBySearchQueries } from "../services/foodSearch";
import FoodDetails from "./FoodDetails";
import Result from "./foodsearch/Result";

const Dashboard = () => {
    const [searchResults, setSearchResults] = useState([]);

    const getSearchResults = async (category) => {
        try {
            const data = await getFoodDataBySearchQueries(category);
            const newSearchResults = data.products;
            console.log("searchResults:", newSearchResults);
            setSearchResults(newSearchResults);
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    return (
        <div className="main">
            <div>
                <FoodSearch getSearchResults={getSearchResults} />
                <h2>Search Results</h2>
                <Result searchResults={searchResults} />
            </div>
        </div>
    );
};

export default Dashboard;

// <FoodDetails foodData={foodData} clearFoodDataState={clearFoodDataState}/>
