import React, { useState } from "react";
import style from "./foodsearch.module.css";

const FoodSearch = ({ getData }) => {
    const [barcode, setBarcode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        getData(barcode);
        setBarcode("");
    };

    return (
        <form className={style.foodSearchInput} onSubmit={handleSubmit}>
            <label htmlFor="food-search">Search your food:</label>
            <input
                id="food-search"
                name="food-search"
                type="text"
                placeholder="Insert food product barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
            ></input>
            <button type="submit">search</button>
        </form>
    );
};

export default FoodSearch;
