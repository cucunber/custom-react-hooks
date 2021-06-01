import { useState } from "react";

/**
 * use to set text inputs value 
 * @param {string} initialValue Initial value for input (init: '')
 * @param {boolean} withFocus add eventsHadnler to check if element on focus or blured
 * @returns {[value, onChange]} changed value and onChange function to change value
 * @returns {[value, onChange, onFocus, onBlur]} changed value, onChange function to change value, onFocus to check focus on element, onBlur if there isn't focus on it
 */

type funcType = React.FormEvent<HTMLInputElement>

function useTextInput(initialValue: string): [value: string, onChange: (e: funcType)=>void]
function useTextInput(initialValue: string, withFocus: boolean): [value: string, onChange: (e: funcType)=>void, focus: boolean, onFocus: (e: funcType)=>void, onBlur: (e: funcType)=>void]

function useTextInput(initialValue: string = '', withFocus?: boolean){
    const [value, setValue] = useState<string>(initialValue)
    const [focus, setFocus] = useState<boolean>(false)

    function onChange(e: funcType){
        e.preventDefault()
        setValue(e.currentTarget.value)
    }

    function onFocus(e: funcType) {
        e.preventDefault()
        setFocus(true)
    }

    function onBlur(e: funcType){
        e.preventDefault()
        setFocus(false)
    }

    if(!withFocus){
        return [value, onChange]
    } else {
        return [value, onChange, focus, onFocus, onBlur]
    }
    
}

export default useTextInput;