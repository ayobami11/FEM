import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { AppContext } from '../App';

// CSS
import '../css/CountryDetails.css';

const CountryDetails = (props) => {
    const {
        formatWithComma,
        countries,
        setCountriesByCategory,
        setSearchCountryValue
    } = useContext(AppContext);

    const { name: countryName } = useParams();

    const currentCountry = countries.find(
        ({ name }) => name?.common.toLowerCase() === countryName.toLowerCase()
    );

    if (currentCountry?.name) {
        const formattedCountryDetails = {
            demonyms:
                currentCountry?.demonyms?.eng?.m ??
                currentCountry?.demonyms?.[
                    Object.values(currentCountry.demonyms)[0]
                ]?.m ??
                currentCountry?.demonyms?.[
                    Object.values(currentCountry.demonyms)[0]
                ]?.f ??
                'Unknown',
            flags: currentCountry?.flags?.png ?? currentCountry?.flags?.svg,
            name:
                currentCountry?.name?.common ??
                currentCountry?.name?.official ??
                'Unknown',
            nativeName:
                currentCountry?.nativeName?.eng?.official ??
                currentCountry?.nativeName?.[
                    Object.values(currentCountry.nativeName)[0]
                ]?.official ??
                'Unknown',
            region: currentCountry?.region ?? 'Unknown',
            capital: currentCountry?.capital?.[0] ?? 'Unknown',
            tld: currentCountry?.tld[0] ?? 'Unknown',
            population: currentCountry?.population ?? 'Unknown',
            subregion: currentCountry?.subregion ?? 'Unknown',
            currencies: currentCountry?.currencies ?? 'Unknown',
            languages: currentCountry?.languages ?? 'Unknown',
            borders: currentCountry?.borders ?? 'Unknown'
        };

        return (
            <section className='details-container'>
                {/* Resets list of countries rendered to the default state and redirects
                the user back to the homepage */}
                <button
                    className='back-btn'
                    onClick={() => {
                        setCountriesByCategory('all');
                        setSearchCountryValue('');
                        props.history.push('/');
                    }}
                >
                    <i className='fas fa-arrow-left'></i>
                    Back
                </button>
                <div className='details'>
                    <figure className='flag-container'>
                        <img
                            className='details-flag'
                            src={formattedCountryDetails.flags}
                            alt={`${formattedCountryDetails.demonyms} flag`}
                        />
                    </figure>
                    <div className='details-info'>
                        <h2 className='details-name'>
                            {formattedCountryDetails.name}
                        </h2>
                        <div className='info'>
                            <div className='info-1'>
                                <p>
                                    <strong>Native name:</strong>{' '}
                                    {formattedCountryDetails.nativeName}
                                </p>
                                <p>
                                    <strong>Population:</strong>{' '}
                                    {formatWithComma(
                                        formattedCountryDetails.population
                                    )}
                                </p>
                                <p>
                                    <strong>Region:</strong>{' '}
                                    {formattedCountryDetails.region}
                                </p>
                                <p>
                                    <strong>Sub Region:</strong>{' '}
                                    {formattedCountryDetails.subregion}
                                </p>
                                <p>
                                    <strong>Capital:</strong>{' '}
                                    {formattedCountryDetails.capital}
                                </p>
                            </div>
                            <div className='info-2'>
                                <p>
                                    <strong>Top Level Domain:</strong>{' '}
                                    {formattedCountryDetails.tld}
                                </p>
                                <p>
                                    <strong>Currencies:</strong>{' '}
                                </p>
                                {Object.values(
                                    formattedCountryDetails.currencies
                                )?.length && (
                                    <ul>
                                        {React.Children.toArray(
                                            Object.values(
                                                formattedCountryDetails.currencies
                                            ).map(({ name }) => (
                                                <li className='details-currencies'>
                                                    {name}
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                )}
                                <p>
                                    <strong>Languages:</strong>{' '}
                                </p>
                                {Object.values(
                                    formattedCountryDetails.languages
                                )?.length && (
                                    <ul>
                                        {React.Children.toArray(
                                            Object.values(
                                                formattedCountryDetails.languages
                                            ).map((language) => (
                                                <li className='details-languages'>
                                                    {language}
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className='info-borders'>
                            <p>
                                <strong>Border Countries:</strong>
                            </p>
                            {(Array.isArray(formattedCountryDetails.borders) &&
                                formattedCountryDetails.borders?.length && (
                                    <ul>
                                        {/* Iterates through the borders array and gets the name of the country
                                     sharing borders using the alpha3Code property */}
                                        {React.Children.toArray(
                                            formattedCountryDetails.borders
                                                .map((borderCountry) => {
                                                    return countries.find(
                                                        ({ cca3 }) =>
                                                            cca3 ===
                                                            borderCountry
                                                    );
                                                })
                                                .map(({ name }) => (
                                                    <li className='border-country'>
                                                        {name?.common}
                                                    </li>
                                                ))
                                        )}
                                    </ul>
                                )) ||
                                'No bordering countries.'}
                        </div>
                    </div>
                </div>
            </section>
        );
    } else {
        return <p>Loading...</p>;
    }
};

export default CountryDetails;
