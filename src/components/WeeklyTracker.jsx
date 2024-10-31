import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const WeeklyTracker = ({ dailyMacrosData = [] }) => {


    const lineChartData = dailyMacrosData
        .map((item) => ({
            date: item.fields.Date, // Use the date for the X-axis
            totalCalories: item.fields.TotalKcal,
        }))
        .slice(-7); // Get only the last 7 days



    const renderLineChart = (
        <LineChart width={600} height={400} data={lineChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="totalCalories" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `${Math.ceil(value)} Calories`} />
        </LineChart>
    );

    return (
        <div>
            <h3>Last 7 Days' Macros</h3>
            {renderLineChart}
        </div>
    );
};

export default WeeklyTracker;

