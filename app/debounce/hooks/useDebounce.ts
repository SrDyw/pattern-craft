import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

export const useDebounce = ({ delay }: { delay: number }): [string, Dispatch<SetStateAction<string>>] => {
    const [text, setText] = useState("");
    const [debounceText, setDebounceText] = useState("");

    const timeout = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        clearDebounceTimeout();

        timeout.current = setTimeout(() => {
            setDebounceText(text);
        }, delay)

        return () => {
            clearDebounceTimeout();
        }
    }, [text]);

    const clearDebounceTimeout = () => {
        if (timeout.current != null) clearTimeout(timeout.current);
    }


    return [debounceText, setText]
}