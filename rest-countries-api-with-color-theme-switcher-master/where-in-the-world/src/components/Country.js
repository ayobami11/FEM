import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../App';

// CSS
import '../css/Country.css';

const Country = ({
    demonyms,
    flags,
    name,
    population = 'Unknown',
    region = 'Unknown',
    capital = 'Unknown'
}) => {
    const { formatWithComma } = useContext(AppContext);

    return (
        <li className='country'>
            <Link to={`/countries/${name?.common}`}>
                <figure className='country-figure'>
                    <img
                        className='country-flag'
                        src={flags?.png}
                        alt={`${demonyms?.eng?.m ?? name?.common} flag`}
                    />
                    <figcaption className='country-name'>
                        <h2>{name?.common}</h2>
                    </figcaption>
                </figure>
                <div className='country-text'>
                    <p className='country-population'>
                        <strong>Population:</strong>{' '}
                        {formatWithComma(population)}
                    </p>
                    <p className='country-region'>
                        <strong>Region:</strong> {region}
                    </p>
                    <p className='country-capital'>
                        <strong>Capital:</strong> {capital[0]}
                    </p>
                </div>
            </Link>
        </li>
    );
};

export default Country;
