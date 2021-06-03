import { useState, useEffect } from "react";

const setCookie = (name: string, value: string, options: { [k: string]: any } = {}) => {
    options = {
        path: '/',
        'max-age': 60 * 60,
        ...options
    }

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let newCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    for (let key in options) {
        newCookie += `; ${key}`
        if(options[key]!==true){
            newCookie += `=${options[key]}`
        }
    }
    document.cookie = newCookie;
}

/**
 * use to work with cookie
 * @param {string} name name of cookie
 * @param {string} value value of cookie
 * @param {{[k: string]: any}} options parametres which will be set (init options are path: '/', 'max-age':3600)
 * @returns {[any, (name: string) => void]} returns value of cookie by name and function which delete this value
 */


function useCookie(name: string): [any, (name: string) => void]
function useCookie(name: string, value: string, options?: { [k: string]: any }): [any, (name: string) => void]

function useCookie(name: string, value?: string, options: { [k: string]: any } = {}) {

    let [returnCookie, setReturnCookie] = useState<any>(undefined)

    const deleteCookie = (name: string) => {
        setCookie(name, '', { 'max-age': -1 })
    }

    useEffect(() => {
        if (value) {
            setCookie(name, value, options)
            setReturnCookie(value)
        } else {
            let cookies = document.cookie.split("; ")
            let item = cookies.find(cookie => cookie.startsWith(name))
            if (item) {
                setReturnCookie(cookies.slice(cookies.indexOf('=') + 1))
            } else {
                setReturnCookie(undefined)
            }
        }
    }, [])

    if (value) {
        return [deleteCookie]
    }
    return [returnCookie, deleteCookie]
}

export default useCookie