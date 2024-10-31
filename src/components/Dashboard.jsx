import React, { useEffect, useState } from "react";
import AddFoodModal from "./addFoodModal/AddFoodModal";
import FoodLog from "./foodLog/FoodLog";
import { fetchFoodLog } from "../services/airTableServiceFoodLog";
import { fetchDailyMacros } from "../services/airTableServiceDailyMacros";
import DailyTracker from "./DailyTracker";
import WeeklyTracker from "./WeeklyTracker.jsx";
import NavBar from "./navBar/NavBar.jsx";
import { Route, Routes } from "react-router-dom";

const Dashboard = () => {
    const [modal, setModal] = useState(false);

    const [foodLog, setFoodLog] = useState([]);

    const [dailyMacros, setDailyMacros] = useState([]);

    const [date,setDate] = useState('');

    const getFoodLog = async () => {
        try {
            const data = await fetchFoodLog();
            setFoodLog(data);
        } catch (error) {
            console.log("error:", error.messsage);
        }
    };

    const fetchDailyMacrosData = async () => {
        try {
            const data = await fetchDailyMacros();
            setDailyMacros(data);
            console.log('Fetching Daily Macros Data', data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getCurrentDateInSingapore = () => {
        return new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Singapore",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(new Date());
    };

    useEffect(() => {
        getFoodLog();
        fetchDailyMacrosData();
        setDate(getCurrentDateInSingapore())
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <NavBar />
            <main>
                <div className="left-panel">
                    <Routes>
                        <Route
                            path="/day-view"
                            element={<DailyTracker dailyMacrosData={dailyMacros} date={date} />}
                        />
                        <Route
                            path="/weekly-view"
                            element={<WeeklyTracker dailyMacrosData={dailyMacros} />}
                        />
                    </Routes>
                </div>
                <div className="food-log-container">
                <FoodLog
                    fetchedFoodLog={foodLog}
                    toggleModal={toggleModal}
                    getFoodLog={getFoodLog}
                    fetchDailyMacrosData={fetchDailyMacrosData}
                />

                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <div>
                                <AddFoodModal toggleModal={toggleModal} getFoodLog={getFoodLog} fetchDailyMacros={fetchDailyMacrosData}/>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </main>
        </>
    );
};

export default Dashboard;
