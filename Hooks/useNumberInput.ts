import { useState } from "react";

/**
 * use to set number inputs value 
 * @param {string} initialValue Initial value for input (init: '')
 * @returns {[value, onChange]} changed value and onChange function to change value
 */

export default function useNumberInput(initialValue: number | string = ''): [value: number | string, onChange: (e: React.FormEvent<HTMLInputElement>)=>void]{
    const [value, setValue] = useState(initialValue)

    function onChange(e: React.FormEvent<HTMLInputElement>){
        e.preventDefault()
        setValue(e.currentTarget.value)
    }

    return [value, onChange]
}