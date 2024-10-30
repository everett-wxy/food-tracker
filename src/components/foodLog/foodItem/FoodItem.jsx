import React from "react";
import { deleteFoodItem } from "../../../services/airTableService";

const FoodItem = ({ food, getFoodLog }) => {
    const cleanUpFoodData = {
        ...food,
        kcal: Math.round(food.fields.TotalKcal),
        serving: food.fields.LoggedServingSize,
    };

    const handleDelete = async (foodId) => {
        try {
            await deleteFoodItem(foodId);
            getFoodLog();
        } catch (error) {
            console.log("Failed to delete food item:", error.message);
        }
    };

    return (
        <div className="food-item-container">
            <p>{food.fields.FoodName}</p>
            <p>Kcal: {cleanUpFoodData.kcal}</p>
            <p>Servings: {cleanUpFoodData.serving}</p>
            <button onClick={() => handleDelete(food.id)}>Delete</button>
        </div>
    );
};

export default FoodItem;
