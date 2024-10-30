import React, { useEffect, useState } from "react";
import { fetchFoodLog } from "../../services/airTableService";
import FoodItem from "./foodItem/FoodItem";

const FoodLog = ({toggleModal, fetchedFoodLog, getFoodLog}) => {
  
    const fooditems = fetchedFoodLog.map((food)=>(
        <FoodItem food={food} getFoodLog={getFoodLog}/> 
    ))

    return (
        <div className="food-log-container">
            {fooditems}
            <button onClick={toggleModal}>Add Food</button>
        </div>
    );
};

export default FoodLog;
