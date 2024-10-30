import React, { useState } from "react";
import FoodSearch from "./foodsearch/FoodSearch";
import { getFoodDataBySearchQueries } from "../services/foodSearch";
// import FoodDetails from "./FoodDetails";
import AddFoodModal from "./addFoodModal/AddFoodModal";

const Dashboard = () => {
    // const [searchResults, setSearchResults] = useState([]);
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    // const getSearchResults = async (category) => {
    //     try {
    //         const data = await getFoodDataBySearchQueries(category);
    //         const newSearchResults = data.products;
    //         console.log("This is the search results:", newSearchResults);
    //         setSearchResults(newSearchResults);
    //     } catch (error) {
    //         console.log("Error:", error.message);
    //     }
    // };

    return (
        <>
            <button onClick={toggleModal}>Add Food</button>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div>
                            {/* <FoodSearch getSearchResults={getSearchResults} /> */}
                            {/* <AddFoodModal searchResults={searchResults} /> */}
                            <AddFoodModal toggleModal={toggleModal}/>
                            <button onClick={toggleModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;

// <FoodDetails foodData={foodData} clearFoodDataState={clearFoodDataState}/>
