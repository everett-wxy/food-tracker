import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Tooltip, Cell, Label } from "recharts";

const WeeklyTracker = ({dailyMacros}) => {
    const data = [
        { name: "Jan", sales: 4000 },
        { name: "Feb", sales: 3000 },
        { name: "Mar", sales: 5000 },
        { name: "Apr", sales: 7000 },
        { name: "May", sales: 2000 },
        { name: "Jun", sales: 3000 },
        { name: "Jul", sales: 5000 },
        { name: "Aug", sales: 6000 },
        { name: "Sep", sales: 7000 },
        { name: "Oct", sales: 4000 },
        { name: "Nov", sales: 5000 },
        { name: "Dec", sales: 8000 },
    ];

    const renderLineChart = (
        <LineChart width={600} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis dataKey="sales" />
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
