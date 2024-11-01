import React, { useState } from "react";
import { deleteFoodItem, updateFoodItem } from "../../services/airTableServiceFoodLog";
import "./foodItem.css";

const FoodItem = ({ food, getFoodLog, fetchDailyMacrosData }) => {
    const [servingSize, setServingSize] = useState(food.fields.LoggedServingSize);
    const [isEditing, setIsEditing] = useState(false); // State to toggle between edit and view modes

    const handleUpdate = async (foodId) => {
        try {
            await updateFoodItem(foodId, servingSize); // Call your update function
            getFoodLog(); // Refresh the food log
            setIsEditing(false); // Exit edit mode
            fetchDailyMacrosData();
        } catch (error) {
            console.log("Failed to update serving size:", error.message);
        }
    };

    const handleDelete = async (foodId) => {
        try {
            await deleteFoodItem(foodId);
            getFoodLog();
            fetchDailyMacrosData();
        } catch (error) {
            console.log("Failed to delete food item:", error.message);
        }
    };

    return (
        <div className="food-item-container" key={food.id}>
            <p className="food-title">{food.fields.FoodName}</p>
            <p className="kcal">Kcal: {Math.round(food.fields.TotalKcal)}</p>
            <p className="date">Date: {food.fields.LinkedDate}</p>
            <div className="serving-size-container">
                {isEditing ? (
                    <input
                        type="number"
                        value={servingSize}
                        onChange={(e) => setServingSize(e.target.value)}
                        min="0"
                        placeholder="Update Servings"
                        className="serving-size-input"
                    />
                ) : (
                    <span onClick={() => setIsEditing(true)}>{`Servings: ${servingSize} g`}</span>
                )}
            </div>
            {isEditing && (
                <div>
                    <button onClick={() => handleUpdate(food.id)}>Update</button>
                </div>
            )}
            <button className="delete-btn" onClick={() => handleDelete(food.id)}>
                Delete
            </button>
        </div>
    );
};

export default FoodItem;
