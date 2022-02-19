import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => fetchData(url), [url]);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);

            if (response.ok) {
                const jsonResponse = await response.json();
                setData(jsonResponse);
                setIsSuccess(true);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return { isLoading, isSuccess, data };
};
