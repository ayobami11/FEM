import React, { useContext } from 'react';

import { AppContext } from '../App';

// CSS
import '../css/CountryList.css';

// Components
import Country from './Country';

const CountryList = () => {
    const {
        countries,
        searchCountryValue,
        countriesByCategory,
        countriesBySearch,
        countriesByRegion
    } = useContext(AppContext);

    return (
        <ul className="country-list">
            {
                // List all countries returned from the API
                countriesByCategory === 'all'
                    ? React.Children.toArray(
                          countries.map((country) => (
                              <Country {...country} />
                          ))
                      )
                    : countriesByRegion.length && searchCountryValue
                    ? React.Children.toArray(
                          countriesByRegion
                              .filter((country) => {
                                  return countriesBySearch.includes(country);
                              })
                              .map((country) => <Country {...country} />)
                      )
                    : //   Filters list of countries based on the region selected
                    countriesByCategory === 'search-region'
                    ? React.Children.toArray(
                          countriesByRegion.map((country) => (
                              <Country {...country} />
                          ))
                      )
                    : //   Filters list of countries based on the value of the search field
                      React.Children.toArray(
                          countriesBySearch.map((country) => (
                              <Country {...country} />
                          ))
                      )
            }
        </ul>
    );
};

export default CountryList;
