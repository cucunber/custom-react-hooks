import { useState } from "react";

/**
 * 
 * @param {string} initialValue Initial value for input (init: '')
 * @returns {[value, onChange]} changed value and onChange function with preventedDefault
 */

export default function useNumberInput(initialValue: number | string = ''): [value: number | string, onChange: (e: React.FormEvent<HTMLInputElement>)=>void]{
    const [value, setValue] = useState(initialValue)

    function onChange(e: React.FormEvent<HTMLInputElement>){
        e.preventDefault()
        setValue(e.currentTarget.value)
    }

    return [value, onChange]
}