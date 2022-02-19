import React from 'react';

// Components
import FilterCountries from './FilterCountries';
import CountryList from './CountryList';

const Home = () => {
    return (
        <main>
            <FilterCountries />
            <CountryList />
        </main>
    );
};

export default Home;
