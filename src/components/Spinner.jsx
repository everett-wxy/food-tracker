import React from "react";

const spinnerLinks = [
    "https://media1.tenor.com/m/jfmI0j5FcpAAAAAd/loading-wtf.gif",
    "https://media1.tenor.com/m/RVvnVPK-6dcAAAAC/reload-cat.gif",
    "https://media1.tenor.com/m/FawYo00tBekAAAAC/loading-thinking.gif",
    "https://media1.tenor.com/m/rg2timExtOAAAAAC/%E1%BB%A7a.gif",
    "https://media1.tenor.com/m/DHkIdy0a-UkAAAAC/loading-cat.gif",
    "https://media1.tenor.com/m/SO1Hj6zAktQAAAAd/loading-shocktin.gif",
    "https://media1.tenor.com/m/qACzaJ1EBVYAAAAd/loading-cat-loading.gif",
    "https://media1.tenor.com/m/XbMA2N11cMAAAAAd/cat-side-eye.gif",
    "https://media1.tenor.com/m/-qBsG1HwR4oAAAAC/cat-dance-dancing-cat.gif",
];

const Spinner = () => {
    const randomIndex = Math.floor(Math.random() * spinnerLinks.length);
    // Select a random spinner link
    const randomSpinnerLink = spinnerLinks[randomIndex];

    return (
        <div className="spinner-container">
            <img src={randomSpinnerLink} alt="Loading..." className="spinner" />
        </div>
    );
};

export default Spinner;
