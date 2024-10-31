import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css'

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to='/day-view'>Day View</Link></li>
                <li><Link to='/weekly-view'>Week View</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;