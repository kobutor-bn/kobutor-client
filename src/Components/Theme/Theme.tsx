import {useEffect, useState} from "react";
import './Theme.css';
import moon_icon from "../../assets/moon_icon.svg";

const Theme = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        const moonIcon = document.querySelector('.moonIcon');
        if (theme === 'light') {
            moonIcon.classList.remove('noneDisplay');
        } else {
            moonIcon.classList.add('noneDisplay');
        }
    }

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <div className="toggle-theme-wrapper">
            <div className="theme-toggle-button-div">
                <label className="toggle-theme" htmlFor="checkbox">
                    <input
                        type="checkbox"
                        id="checkbox"
                        onChange={toggleTheme}
                    />
                    <div className="slider round"></div>
                    <img src={moon_icon} className="moonIcon noneDisplay" alt="moon icon"></img>
                </label>

            </div>
        </div>
    )
}


export default Theme;