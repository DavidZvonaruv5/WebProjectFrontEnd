import { useState, useEffect } from "react"

const usePersist = () => {
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])
    
    return [persist, setPersist]
}

export default usePersist

/*
  The usePersist custom hook is used to manage the persistent login option in the TaskFlow application.
  It provides a way to persist the user's login state across browser sessions by storing the persist state in the browser's local storage.

  The hook consists of the following main elements:

  - useState: The persist state is managed using the useState hook. It is initialized with the value retrieved from the local storage or set to false if no value is found.

  - useEffect: The useEffect hook is used to update the local storage whenever the persist state changes. It ensures that the persist state is always stored in the browser's local storage.

  - Return: The hook returns an array with two elements: the persist state and the setPersist function to update the persist state.
*/