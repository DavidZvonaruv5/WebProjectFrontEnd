import { useEffect } from "react"

const useTitle = (title) => {

    useEffect(() => {
        //get the title
        const prevTitle = document.title
        //set the new title
        document.title = title

        //whenever the compopnet unmounts, this will set the title back to what it was
        return () => document.title = prevTitle
    }, [title])

}

export default useTitle