import React, { useEffect, useState } from "react";
import FoodSearch from "./foodsearch/FoodSearch";
import { getFoodData } from "../services/foodSearch";
import FoodDetails from "./FoodDetails";

const Dashboard = () => {
    const [foodData, setFoodData] = useState({});

    const getData = async (barcode) => {
        const data = await getFoodData(barcode);
        const newFoodData = {
            productName: data.product.product_name,
            productKcal: data.product.nutriments.energy,
            productCarbs: data.product.nutriments.carbohydrates,
            productSugars: data.product.nutriments.sugars,
            productProteins: data.product.nutriments.proteins,
            productFats: data.product.nutriments.fat,
            productImage: data.product.selected_images.front.small.en,
        };
        setFoodData(newFoodData);
    };

    const clearFoodDataState = () => {
        setFoodData({});
    }

    useEffect(() => {
        console.log('Food data after clearing:', foodData);
    }, [foodData]);

    console.log("Dashboard food data:", foodData);
    
    return (
        <div className="main">
            <div>
                <FoodSearch getData={getData} />
            </div>
            <div>
                <FoodDetails foodData={foodData} clearFoodDataState={clearFoodDataState}/>
            </div>
        </div>
    );
};

export default Dashboard;
