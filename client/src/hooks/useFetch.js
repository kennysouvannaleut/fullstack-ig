import { useState, useEffect } from 'react';
import axios from 'axios';

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// custom hook for performing get request
const useFetch = (url, initValue) => {
    const [data, setData] = useState(initValue);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(url);
            if (res.status === 200) {
            setData(res.data);
            }
        } catch (error) {
          throw error;    
        } finally {
            setLoading(false);
        }
    };

    fetchData();
    }, [url]);
    return { loading, data };
};

export default useFetch;
