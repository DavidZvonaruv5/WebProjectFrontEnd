import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

//in this component we are going to allow the user to make a new note, this is the logic behind creating a new note, here we are going to check various things that can prevent from a note to be created.
const NewNoteForm = ({ users }) => {

    //just like in all of the other components, we chose the method of mutations, we thought it is most appropriate
    //to use this method, we are saving the state of the note is in and with that we are displaying what is necessary.
    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    //easier route navigation system
    const navigate = useNavigate()

    //Use state initialization
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    //useEffect hook that checks if the note has been added
    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes') //use of the useNavigate hook, routing back to the notes
        }
    }, [isSuccess, navigate])

    //event listeners for each of the note fields, they will update as we make changes in the fields
    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    //check if we can add the new note
    const canSave = [title, text, userId].every(Boolean) && !isLoading

    //check if the new note can be saved, if so create the new note with the userId, title and text of the note
    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    //set up the combobox that displays all of the users --> used to assign a user to the note
    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    //error messages and will display dynamically if there are errors, invalid/valid title, text, etc.
    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    //In this part we are setting up the page content
    //we are using a fragment tag element so we won't have a semantic React error
    //In the page we are displaying the note we want to create, we will display each field of the note and allow the user to fill the note contents(title, text, assign the note to a user)
    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    <h2>New Note</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}

export default NewNoteForm