import {useState, useCallback} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = "GET", body = null, headers = {"Content-Type": "application/json"}) => 
    {
        setLoading(true);

        try {
            const respose = await fetch(url, {method, body, headers});

            if (!respose.ok) {
                throw new Error(`Could not fetch ${url}, status: ${respose.status}`);
              }

            const data = await respose.json();
            setLoading(false);
            return data;
        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}