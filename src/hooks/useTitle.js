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

/*
  The useTitle custom hook is used to dynamically update the document title in the browser for a specific component.

  The hook consists of the following main elements:

  - useEffect: The useEffect hook is used to perform side effects when the component mounts or when the `title` dependency changes.
    - On mount or when the `title` changes, the hook updates the document title by setting `document.title` to the provided `title`.
    - The previous title is stored in the `prevTitle` variable to restore it when the component unmounts or when the `title` changes again.
    - When the component unmounts, the returned cleanup function is triggered, setting the document title back to the previous title.
*/