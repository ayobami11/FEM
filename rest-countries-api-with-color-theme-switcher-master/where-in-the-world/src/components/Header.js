import React, { useContext } from 'react';

import { AppContext } from '../App';

// CSS
import '../css/Header.css';

const Header = () => {
    const { setIsLightMode } = useContext(AppContext);

    return (
        <header className="header">
            <div className="header-container">
                <h1 className="header-title">Where in the world?</h1>
                <button
                    className="header-button"
                    onClick={() =>  setIsLightMode(prevMode => !prevMode)}
                >
                    <figure className="header-figure">
                        <i className="fas fa-moon"></i>
                        <figcaption>Dark mode</figcaption>
                    </figure>
                </button>
            </div>
        </header>
    );
};

export default Header;
