import React, { useEffect, useState } from "react";
import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from "recharts";

const DailyTracker = ({ dailyMacrosData, date }) => {
    const [currentDayMacros, setCurrentDayMacros] = useState(null);

    useEffect(() => {
        const todaysMacros = dailyMacrosData.find((item) => item.fields.Date === date);

        if (todaysMacros) {
            setCurrentDayMacros(todaysMacros.fields);
        } else {
            setCurrentDayMacros(null);
        }
    }, [dailyMacrosData, date]);

    const pieChartData = currentDayMacros
        ? (() => {
              const totalCalories =
                  currentDayMacros.TotalCarbs * 4 +
                  currentDayMacros.TotalFats * 9 +
                  currentDayMacros.TotalProteins * 4;
              return [
                  {
                      name: "Carbs",
                      value: Math.round(((currentDayMacros.TotalCarbs * 4) / totalCalories) * 100),
                  },
                  {
                      name: "Fats",
                      value: Math.round(((currentDayMacros.TotalFats * 9) / totalCalories) * 100),
                  },
                  {
                      name: "Protein",
                      value: Math.round(
                          ((currentDayMacros.TotalProteins * 4) / totalCalories) * 100
                      ),
                  },
              ];
          })()
        : [];

    const pieChartDataKcal = currentDayMacros
        ? [{ name: "Kcal", value: Math.round(currentDayMacros.TotalKcal) }]
        : [];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Added an extra color

    return (
        <div>
            <h3>Today's Macros</h3>
            {currentDayMacros ? (
                <>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            {/* Outer Circle: Total Kcal */}
                            <Pie
                                data={pieChartDataKcal}
                                dataKey="value"
                                nameKey="name"
                                cy="50%"
                                outerRadius={130} // Adjusted for outer radius
                                innerRadius={120} // Added inner radius for hollow effect
                                fill="#8884d8"
                                label={({ name, value }) => `${name}: ${value}kcal`}
                            >
                                {pieChartDataKcal.map((entry, index) => (
                                    <Cell key={`cell-kcal-${index}`} fill={COLORS[3]} />
                                ))}
                            </Pie>

                            {/* Inner Circle: Macros Breakdown */}
                            <Pie
                                data={pieChartData}
                                dataKey="value"
                                nameKey="name"
                                cy="50%"
                                innerRadius={80} // Inner radius for donut effect
                                outerRadius={110}
                                fill="#8884d8"
                                label={({ name, value }) => `${name}: ${value}%`}
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            {/* Tooltip with different formatting for Kcal and macros */}
                            <Tooltip
                                formatter={(value, name) => {
                                    if (name === "Kcal") {
                                        return [`${Math.round(value)} Calories`, name];
                                    }
                                    return [`${Math.round(value)}%`, name];
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </>
            ) : (
                <p>No macro data available for today.</p>
            )}
        </div>
    );
};

export default DailyTracker;
