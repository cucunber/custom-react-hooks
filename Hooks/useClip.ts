import { RefObject, useState, useEffect } from "react";

function useClip<T>(ref: RefObject<T>): boolean
function useClip<T, N>(ref: RefObject<T>, activator: RefObject<N>): boolean


/**
 * copy text of the Element 
 * @param {RefObject<T>} ref reference of the element which text must be copied
 * @param {RefObject<N>} activator reference of the element which must be clicked to copy text
 * @param {number} delay delay after which state become false
 * @returns {boolean} return success (true) or failed (false) state
 */

function useClip<T extends any, N extends any>(ref: RefObject<T>, activator?: RefObject<N>, delay: number = 1000): boolean {

    const [clip, setClip] = useState(false)

    useEffect(() => {

        if (!ref.current) return

        const refNode = ref.current

        const copy = () => {
            if ((refNode as Element).nodeName === "INPUT") {
                navigator.clipboard.writeText((refNode as HTMLInputElement).value).then(() => setClip(true)).catch(() => setClip(false)).finally(() => setTimeout(() => setClip(false), delay))
            } else {
                if (((refNode as Element).textContent?.length) && !((refNode as Element).textContent)) {
                    navigator.clipboard.writeText((refNode as Element).textContent!).then(() => setClip(true)).catch(() => setClip(false)).finally(() => setTimeout(() => setClip(false), delay))
                } else {
                    setClip(false)
                    console.warn(`${(refNode as Element).nodeName} doesn't contain any text`)
                }
            }
        }

        if (activator) {
            if (!activator.current) return
            (activator.current as Element).addEventListener('click', copy)
        } else {
            (refNode as Element).addEventListener('click', copy)
        }

        return function () {
            if (activator) {
                if (!activator.current) return
                (activator.current as Element).removeEventListener('click', copy)
            } else {
                (refNode as Element).removeEventListener('click', copy)
            }
        }
    }, [])

    return clip
}

export default useClip;