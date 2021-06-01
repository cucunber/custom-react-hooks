import { RefObject, useEffect, useState } from "react";

/**
 * use to detect if the element have been hovered
 * @param {RefObject<T>} ref reference of your element (use hook useRef to get reference)
 * @returns {boolean} boolean state: true if element is hovering, false in other case
 */

export default function useHover<T extends Element>(ref: RefObject<T>): boolean {
    const [isHover, setHover] = useState(false);

    const on = () => setHover(true)
    const off = () => setHover(false)

    useEffect(() => {
        if (!ref.current) return
        
        const node = ref.current
        node.addEventListener('mouseover', on)
        node.addEventListener('mouseout', off)

        return function () {
            node.removeEventListener('mouseover', on)
            node.removeEventListener('mouseout', off)
        }
    }, [])
    
    return isHover
}