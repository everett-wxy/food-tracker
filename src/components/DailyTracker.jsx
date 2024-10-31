import React, { useEffect, useState } from "react";
import { Pie, PieChart, Tooltip, Cell } from "recharts";

const DailyTracker = ({ dailyMacrosData }) => {
    const [currentDayMacros, setCurrentDayMacros] = useState(null);

    const getCurrentDateInSingapore = () => {
        return new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Singapore",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(new Date());
    };

    useEffect(() => {
        const today = getCurrentDateInSingapore();
        const todaysMacros = dailyMacrosData.find((item) => item.fields.Date === today);

        if (todaysMacros) {
            setCurrentDayMacros(todaysMacros.fields);
        } else {
            setCurrentDayMacros(null);
        }
    }, [dailyMacrosData]); // Runs every time dailyMacrosData changes


    const pieChartData = currentDayMacros
        ? [
              { name: "Carbs", value: currentDayMacros.TotalCarbs * 4 },
              { name: "Fats", value: currentDayMacros.TotalFats * 9 },
              { name: "Protein", value: currentDayMacros.TotalProteins * 4 },
          ]
        : [];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    const renderPieChart = (
        <PieChart width={350} height={250}>
            <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cy="50%"
                xy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
            >
                {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );

    return (
        <div>
            <h3>Today's Macros</h3>
            {currentDayMacros ? (
                <>
                {renderPieChart}
                </>
            ) : (
                <p>No macro data available for today.</p>
            )}
        </div>
    );
};

export default DailyTracker;
