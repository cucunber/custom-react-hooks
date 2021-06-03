import { useState, useEffect } from "react"

interface IDOMReadyState {
    readonly readyState: string;
}

const initialState: IDOMReadyState = {
    readyState: document.readyState,
}

/**
 * @return {string} String type state: loading, interective, complete
 */

function useDOMState(): string {
    const [state, setState] = useState(initialState)

    const handlerDOM = () => {
        setState({ readyState: document.readyState })
    }

    useEffect(() => {
        document.addEventListener('readystatechange', handlerDOM)
        return function () {
            document.removeEventListener('readystatechange', handlerDOM)
        }
    }, [])

    return state.readyState
}

export default useDOMState