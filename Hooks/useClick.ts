import { RefObject, useEffect, useState } from "react"

/**
 * use to check if the element have been clicked
 * @param {RefObject<T>} ref reference of your element (use hook useRef to get reference)
 * @returns {boolean} boolean state: true if element is hovering, false in other case
 */

export default function useClick<T extends Element>(ref: RefObject<T>): boolean{
    const [isClicked, setIsClicked] = useState<boolean>(false)
    
    const toggler = () => setIsClicked(!isClicked)

    useEffect(()=>{
        if(!ref.current) return 

        const node = ref.current
        node.addEventListener('click', toggler)
        
        return function(){
            node.removeEventListener('click', toggler)
        }
    })

    return isClicked
}