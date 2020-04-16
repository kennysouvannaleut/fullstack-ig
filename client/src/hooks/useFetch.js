import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            // setIsLoading(true);
        try {
            const res = await axios.get(url, options);
            const json = await res.json();
            setResponse(json);
            // setIsLoading(false);
        } catch (error) {
            setError(error);
        }
    };
    fetchData();
}, []);
    return { response, error };
};

