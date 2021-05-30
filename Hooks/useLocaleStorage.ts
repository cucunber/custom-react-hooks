import { useState, useEffect } from "react";

/**
 * 
 * @param {string} key Key for defaultValue which will be used to get item out of localStorage 
 * @param {any} defaultValue Initial value which will be used to set item in localStorage
 * @returns {[any, React.Dispatch<any>]} returns value which includes localStorage item and function setValue which change localStorage item
 */

export default function useLocalStorage<T=any>(key:string, defaultValue:T): [value:any, setValue: React.Dispatch<any>]{

    const [value, setValue] = useState(JSON.parse(JSON.stringify(localStorage.getItem(key))) || defaultValue)

    useEffect(()=>{
        localStorage.setItem(key, value)
    }, [value])

    return [value, setValue]
}