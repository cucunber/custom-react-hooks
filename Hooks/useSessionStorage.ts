import { useState, useEffect } from "react";

/**
 * 
 * @param {string} key Key for defaultValue which will be used to get item out of sessionStorage 
 * @param {any} defaultValue Initial value which will be used to set item in sessionStorage
 * @returns {[any, React.Dispatch<any>]} returns value which includes sessionStorage item and function setValue which change sessionStorage item
 */

export default function useSessionStorage<T=any>(key:string, defaultValue:T): [value:any, setValue: React.Dispatch<any>]{

    const [value, setValue] = useState(JSON.parse(JSON.stringify(sessionStorage.getItem(key))) || defaultValue)

    useEffect(()=>{
        sessionStorage.setItem(key, value)
    }, [value])

    return [value, setValue]
}