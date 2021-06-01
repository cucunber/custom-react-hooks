import { RefObject, useCallback, useEffect, useRef } from "react";

/**
 * use to check the end of scroll
 * @param {RefObject<T>} parentRef ref of parent block (use useRef to create ref) which will be scroll wrapper
 * @param {RefObject<N>} childRef ref of child block (use useRef to create ref) 
 * @param {(arg?: any)=>void} callback function, which will be called when child block ends
 */

export default function useScroll<T extends Element, N extends Element>(parentRef: RefObject<T>, childRef: RefObject<N>, callback: (arg?: any)=>void): void {
    const observer = useRef<any>()
    const newCallback = useCallback(callback, [])

    useEffect(() => {
        const options = {
            root: parentRef.current,
            rootMargin: '0px',
            threshholds: 0
        }
        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                newCallback()
            }
        }, options)
        observer.current.observe(childRef.current)

        return function () {
            observer.current.unobserve(childRef.current)
        }
    }, [newCallback])
}