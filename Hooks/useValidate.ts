import { useEffect, useState } from "react";

/**
 * Use to validate text fields like input, textareas and etc. in forms
 * @param {string} value  the value which will be checked
 * @param {Array<(value: string)=>boolean>} depends the array of functions which will be check the value 
 * @param {boolean} initValue the value that will be set as initial during initialization
 * @returns {boolean | null} return bollean value: (if initValue undefined return null) true - if all depends were passed, false in depends weren't passed
 */

function useValidate(value: string, depends: Array<(value: string)=>boolean>, initValue?: boolean): boolean | null{
    const [isValid, setIsValid] = useState<boolean | null>(initValue || null)

    useEffect(()=>{
        depends.some(item=>!item(value)) ? setIsValid(false) : setIsValid(true)
    }, [value])

    useEffect(()=>{
        if(initValue) setIsValid(initValue)
    }, [])

    return isValid
}

export default useValidate;