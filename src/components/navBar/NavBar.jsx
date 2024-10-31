import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css'

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to='/test'>Next Day</Link></li>
                <li>Today's Date</li>
                <li><Link to='/test2'>Previous Day</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;