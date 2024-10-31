const apiKey = import.meta.env.VITE_TOKEN;

const baseId = "appnXQbYNcFK7Qhia";
const tableName = "DailyMacros";
const parameters = "?sort[0][field]=Date&sort[0][direction]=asc";
const url = `https://api.airtable.com/v0/${baseId}/${tableName}${parameters}`;

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
            throw new Error(
                `Error ${response.status}: ${errorData.error.message || response.statusText}`
            );
        }

        const data = await response.json();

        return data.records;
    } catch (error) {
        console.log("Error fetching daily macros:", error.message);
    }
};

export { fetchDailyMacros };
