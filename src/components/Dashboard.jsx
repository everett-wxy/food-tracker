import React, { useEffect, useState } from "react";
import AddFoodModal from "./addFoodModal/AddFoodModal";
import FoodLog from "./foodLog/FoodLog";
import { fetchFoodLog } from "../services/airTableServiceFoodLog";
import { fetchDailyMacros } from "../services/airTableServiceDailyMacros";
import DailyTracker from "./DailyTracker";
import WeeklyTracker from "./WeeklyTracker.jsx";

const Dashboard = () => {
    const [modal, setModal] = useState(false);

    const [foodLog, setFoodLog] = useState([]);

    const [dailyMacros, setDailyMacros] = useState([]);

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
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getFoodLog();
        fetchDailyMacrosData();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <main>
            <div className="left-panel">
                <DailyTracker dailyMacrosData={dailyMacros} />
                <WeeklyTracker dailyMacrosData={dailyMacros}/>
            </div>
            <FoodLog fetchedFoodLog={foodLog} toggleModal={toggleModal} getFoodLog={getFoodLog} />

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div>
                            <AddFoodModal toggleModal={toggleModal} getFoodLog={getFoodLog} />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Dashboard;
