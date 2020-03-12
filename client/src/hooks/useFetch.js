import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            try {
                setIsError(false);
                setIsLoading(true);
                const response = await axios.get(url);
                setData(response.data);

            } catch (error) {
                setIsError(true);

            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        
        return () => {
            didCancel = true;
        };

    }, [url]);

    return [{ data, isLoading, isError }, setUrl];
};