import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'


const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }


    return (
        <>
            <nav>
                <div className="left">
                    <h1>ASP</h1>
                </div>
                <div className={`right ${showMenu ? 'show' : ''}`}>
                <Link to='' ></Link>
                    <Link to='/'>Home</Link>
                    <Link to='/GithubProfiles'>Github Profile</Link>
                    <Link to='/Notes'>Notes</Link>
                    <Link to='/Login'>Login</Link>
                    <Link to='/Signup'>Signup</Link>
                </div>
                <div className="menu-icon" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

            </nav>
        </>
    )
}

export default Navbar
