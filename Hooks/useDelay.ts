import { useCallback, useRef } from "react";

/**
 * use to call function after delay
 * @param {(arg?: any)=>void} callback the callback function which will be implements after delay
 * @param {number} delay the time for which the callback will be delayd
 * @returns {()=>void} return functon with delay
 */

//overloads
function useDelay(callback: (...arg: any) => void, delay: number): (...arg: any) => void
function useDelay(callback: () => void, delay: number): () => void

function useDelay(callback: (arg?: any) => void , delay: number){
    const timer = useRef<NodeJS.Timeout>()

    const delayedCallback = useCallback((...arg) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            if(arg){
                callback(...arg)
            } else {
                callback()
            }
            
        }, delay)
    }, [callback, delay])

    return delayedCallback
}

export default useDelay;