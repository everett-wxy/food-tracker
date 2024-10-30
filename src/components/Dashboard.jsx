import React, { useEffect, useState } from "react";
import AddFoodModal from "./addFoodModal/AddFoodModal";
import FoodLog from "./foodLog/FoodLog";
import { fetchFoodLog } from "../services/airTableServiceFoodLog";

const Dashboard = () => {
    const [modal, setModal] = useState(false);

    const [foodLog, setFoodLog] = useState([]);

    const getFoodLog = async () => {
        try {
            const data = await fetchFoodLog();
            setFoodLog(data);
        } catch (error) {
            console.log("error:", error.messsage);
        }
    };

    useEffect(() => {
        console.log("foodlog:", foodLog);
        getFoodLog();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
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
        </>
    );
};

export default Dashboard;
