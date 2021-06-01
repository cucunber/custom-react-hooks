import { useEffect, useState } from "react";

function useRequest<T, D, E>(request: () => Promise<T>): [D, boolean, E]
function useRequest<T, D, E>(request: (...args: any) => Promise<T>): [D, boolean, E]

/**
 * use to make async functions and return status of it
 * @param {(args?: any) => Promise<T>} request callback function which return Promise
 * @returns {[D, boolean, E]} return array ([data, loading, error]) with data equal response of the server, loading state , error (if there haven't been error, return null) 
 */
function useRequest<T, D, E>(request: (args?: any) => Promise<T>) {
    const [data, setData] = useState<D | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<E | null>(null)

    useEffect((...args) => {
        setLoading(true)
        if(args){
            request(...args).then((response: any) => setData(response)).catch((error: any) => setError(error)).finally(() => setLoading(false))
        }else{
            request().then((response: any) => setData(response)).catch((error: any) => setError(error)).finally(() => setLoading(false))
        }
    }, [])
    return [data, loading, error]
}



export default useRequest;