import React, { useState } from "react";

const FoodSearch = ({ getSearchResults }) => {
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        getSearchResults(category, brand);
        setCategory("");
        setBrand("");
    };

    const isDisabled = !category && !brand; // Check if both inputs are empty

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="food-search" style={{ display: 'block' }}>Search for category:</label>
                <input
                    id="food-search"
                    name="food-search"
                    type="text"
                    placeholder="Type in keywords to search food"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: '70%' }}
                ></input>
                <label htmlFor="brand-search" style={{ display: 'block' }}>Search for brand:</label>
                <input
                    id="brand-search"
                    name="brand-search"
                    type="text"
                    placeholder="Type in brand name"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    style={{ width: '70%' }}
                ></input>
                <button className="search-food-btn" type="submit" disabled={isDisabled}>search</button>
            </form>
        </>
    );
};

export default FoodSearch;
