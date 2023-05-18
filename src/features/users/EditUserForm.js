import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

//This component is going to be very similar to the NewUserForm component
//Here we are using the update user mutation and Delete user mutation hooks we created

//we are going to check the regex username and password again, just like in the newUserForm
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => { //we need to destructure the user we are going to add/delete

    //making use of the update and delete user mutations, for each we can check the loading, success and error status
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, { //we are renaming those so that we can check after
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()


    const navigate = useNavigate()

    //These are the same states we are using in the NewUserForm
    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    //This is the only new state, we might want to disable the activity of the employee
    const [active, setActive] = useState(user.active)

    //Testing the username and password
    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    //If the user is updated or deleted, we want to navigate back to the users list
    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    //If there is an error, we want to show it
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    //save all of the roles the user will obtain
    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    //we want to be able to disable the user-> sets the previous active state to the opposite
    const onActiveChanged = () => setActive(prev => !prev)

    //we want to be able to save the user 
    const onSaveUserClicked = async (e) => {
        if (password) {//we check if we have a password to be updated, we check that because we dont require the password to be updated each time a user needs to be updated
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    //calls the delete user mutation, passes the id so that the user with the corresponding id can be deleted
    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    //provides all the roles options just like in the NewUserForm
    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        //check if we can save the user we want to edit
        //this is done via checking that all of the array is true and the user is not in the loading state
        //just like in NewUserForm, if the length of the roles is bigger than one and if the username and passwords are valid.
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        //this option is provided if the password is not valid, in this case, we dont want to edit the password, so we check if we can save without it
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    //define the special classes we are going to use for errors
    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    //same as the NewUserForm, but with the addition of the delerror message
    //if there is no error, this will be defined as empty
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    //content will display our form just like in the NewUserForm Component
    //the main difference is that we can also delete a user
    //essentially all of the form is the same except of the addition of the active check box
    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default EditUserForm