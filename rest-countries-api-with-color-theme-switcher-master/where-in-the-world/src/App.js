import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { useFetch } from './custom-hooks/useFetch';

// CSS
import './css/App.css';

// Components
import Header from './components/Header';
import Home from './components/Home';
import CountryDetails from './components/CountryDetails';

export const AppContext = React.createContext();

/**
 * Formats a number to include commas in appropriate places
 *
 * @param {number} number The number which is formatted to include commas
 */
const formatWithComma = (number) => {
    const digitsArray = String(number).split('');
    for (let i = digitsArray.length - 3; i > 0; i -= 3) {
        digitsArray[i] = ',' + digitsArray[i];
    }

    return digitsArray.join('');
};

const App = () => {
    const [countries, setCountries] = useState([]);

    const [countriesByRegion, setCountriesByRegion] = useState([]);
    const [countriesBySearch, setCountriesBySearch] = useState([]);
    const [countriesByCategory, setCountriesByCategory] = useState('all');

    const [searchCountryValue, setSearchCountryValue] = useState('');
    const [searchRegionValue, setSearchRegionValue] = useState('');

    const [isLightMode, setIsLightMode] = useState(false);

    const endpoint = 'https://restcountries.com/v3.1/all';
    const { isSuccess, data } = useFetch(endpoint);

    // Fetches countries' data from the API
    useEffect(() => {
        if (isSuccess) {
            const countries = [...data].sort((a, b) => {
                const countryA = a.name?.official.toLowerCase();
                const countryB = b.name?.official.toLowerCase();

                return countryA < countryB ? -1 : countryA > countryB ? 1 : 0;
            });

            console.log(countries);
            setCountries(countries);
        }
    }, [data, isSuccess]);

    // Modifies the rendered countries based on the search input value
    useEffect(() => {
        const filterCountriesBySearch = () => {
            const filteredCountriesBySearch = countries.filter(({ name }) =>
                name?.common
                    .toLowerCase()
                    .startsWith(searchCountryValue.toLowerCase())
            );
            setCountriesByCategory('search-country');
            setCountriesBySearch(filteredCountriesBySearch);
        };

        if (searchCountryValue.length) filterCountriesBySearch();
        // Renders countries by region if searchCountryValue becomes empty
        else if (searchRegionValue.length)
            setCountriesByCategory('search-region');
        else {
            setCountriesBySearch([]);
            setCountriesByCategory('all');
        }
    }, [countries, searchCountryValue, searchRegionValue]);

    // Modifies the rendered countries based on the region selected
    useEffect(() => {
        const filterCountriesByRegion = () => {
            const filteredCountriesByRegion = countries.filter(
                ({ region }) => region === searchRegionValue
            );
            setCountriesByCategory('search-region');
            setCountriesByRegion(filteredCountriesByRegion);
        };

        if (searchRegionValue.length) {
            filterCountriesByRegion();
            // Clears the search input field when the region is changed
            setSearchCountryValue('');
        } else {
            setCountriesByRegion([]);
            setCountriesByCategory('all');
        }
    }, [countries, searchRegionValue]);

    const appContextValue = {
        formatWithComma,
        countries,
        countriesByRegion,
        countriesBySearch,
        countriesByCategory,
        setCountriesByCategory,
        searchCountryValue,
        setSearchCountryValue,
        searchRegionValue,
        setSearchRegionValue,
        setIsLightMode
    };

    return (
        <Router>
            <AppContext.Provider value={appContextValue}>
                <div className={`App${isLightMode ? ' light-mode' : ''}`}>
                    <Header />
                    <Switch>
                        <Route
                            path='/countries/:name'
                            component={CountryDetails}
                        />
                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </AppContext.Provider>
        </Router>
    );
};

export default App;
