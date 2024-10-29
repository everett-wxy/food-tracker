import React, { useState } from "react";
import { logFoodData } from "../services/airTableService";

const FoodDetails = ({ foodData, clearFoodDataState }) => {
    const [message, setMessage] = useState("");  // Define state for message
    console.log("FoodDetails.jsx: Food data:", foodData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Food data before logging:", foodData);
            await logFoodData(foodData);
            setMessage("Food data logged successfully!");
            clearFoodDataState();
        } catch (error) {
            setMessage("Error logging food data.");
        }
        
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Nutritional Information</h2>
                <img
                    src={foodData.productImage}
                    height="100"
                    alt={`Front display of ${foodData.productName}`}
                />
                <p>Product Name: {foodData.productName}</p>
                <p>Kcal per 100g: {foodData.productKcal}</p>
                <p>Carbs per 100g: {foodData.productCarbs}g</p>
                <p>Proteins per 100g: {foodData.productProteins}g</p>
                <p>Fats per 100g: {foodData.productFats}g</p>
                <button type="submit">Add</button>
            </form>
            
        </>
    );
};

export default FoodDetails;
