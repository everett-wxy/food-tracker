import React, { useState } from "react";

const FoodSearch = ({ getSearchResults }) => {
    const [category, setCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        getSearchResults(category);
        setCategory("");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="food-search" style={{ display: 'block' }}>Search your food:</label>
                <input
                    id="food-search"
                    name="food-search"
                    type="text"
                    placeholder="Type in keywords to search food"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: '70%' }}
                ></input>
                <button type="submit">search</button>
            </form>
        </>
    );
};

export default FoodSearch;
