import React, { useEffect, useState } from "react";
import { fetchFoodLog } from "../../services/airTableServiceFoodLog";
import FoodItem from "./foodItem/FoodItem";

const FoodLog = ({ toggleModal, fetchedFoodLog, getFoodLog }) => {
    const fooditems = fetchedFoodLog.map((food) => <FoodItem food={food} getFoodLog={getFoodLog} key={food.id} />);

    return (
        <div className="food-log-container">
            {fooditems}
            <button onClick={toggleModal}>Add Food</button>
        </div>
    );
};

export default FoodLog;
