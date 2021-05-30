import { RefObject, useEffect, useState } from "react";

/**
 * 
 * @param ref reference of your element 
 * @returns boolean state: true if element is hovering, false in other case
 */

export default function useHover(ref: RefObject<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | HTMLInputElement>): boolean {
    const [isHover, setHover] = useState(false);

    const on = () => setHover(true)
    const off = () => setHover(false)

    useEffect(() => {
        if (!ref.current) {
            return
        }
        const node = ref.current
        node.addEventListener('mouseover', off)
        node.addEventListener('mouseout', on)
        return function () {
            node.removeEventListener('mouseover', off)
            node.removeEventListener('mouseout', on)
        }
    }, [])
    return isHover
}