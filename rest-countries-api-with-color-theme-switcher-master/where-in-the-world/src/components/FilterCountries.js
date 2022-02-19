import React, { useContext } from 'react';

import { AppContext } from '../App';

// CSS
import '../css/FilterCountries.css';

const FilterCountries = () => {
    const {
        searchCountryValue,
        setSearchCountryValue,
        searchRegionValue,
        setSearchRegionValue
    } = useContext(AppContext);

    const handleInputChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'search-country':
                setSearchCountryValue(value);
                break;
            case 'search-region':
                setSearchRegionValue(value);
                break;
            default:
                console.log('Something went wrong.');
        }
    };

    return (
        <form className="search-form">
            <div className="search-country-container">
                <i className="fas fa-search"></i>
                <input
                    className="search-country"
                    type="search"
                    name="search-country"
                    value={searchCountryValue}
                    placeholder="Search for a country..."
                    onChange={handleInputChange}
                />
            </div>
            <div className="search-region-container">
                <i className="fas fa-chevron-down"></i>
                <select
                    className="search-region"
                    name="search-region"
                    value={searchRegionValue}
                    onChange={handleInputChange}
                >
                    <option className="display-none" value="">
                        Filter by Region
                    </option>
                    <option className="region-options" value="Africa">Africa</option>
                    <option className="region-options" value="Americas">America</option>
                    <option className="region-options" value="Asia">Asia</option>
                    <option className="region-options" value="Europe">Europe</option>
                    <option className="region-options" value="Oceania">Oceania</option>
                </select>
            </div>
        </form>
    );
};

export default FilterCountries;
