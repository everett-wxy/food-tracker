import React, { useEffect, useState } from "react";
import { fetchFoodLog } from "../../services/airTableServiceFoodLog";
import FoodItem from "./FoodItem";
import './foodLog.css'

const FoodLog = ({ toggleModal, fetchedFoodLog, getFoodLog, fetchDailyMacrosData }) => {
    const fooditems = fetchedFoodLog.map((food) => <FoodItem food={food} getFoodLog={getFoodLog} key={food.id} fetchDailyMacrosData={fetchDailyMacrosData}/>);

    return (
        <div className="food-log-container">
            {fooditems}
            <button onClick={toggleModal}>Add Food</button>
        </div>
    );
};

export default FoodLog;
