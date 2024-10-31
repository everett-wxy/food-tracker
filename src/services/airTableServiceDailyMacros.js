const apiKey = import.meta.env.VITE_TOKEN; 

const baseId = "appnXQbYNcFK7Qhia"; 
const tableName = "Daily Macros"; 
const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`; 

// Function to fetch daily macros
const fetchDailyMacros = async () => {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        // Check if response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message || response.statusText}`);
        }

        const data = await response.json();
        return data.records;
    } catch (error) {
        console.log("Error fetching daily macros:", error.message);
    }
};

// fetchDailyMacros();
// Export the function for use in other components
export { fetchDailyMacros };
