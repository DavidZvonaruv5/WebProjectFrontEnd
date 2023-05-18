import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

//////////////////////////////////////////
//The HR or the roles will be making the users-> the new employees that come to the company
//These are regex constants, which will accept all letters, the password will also accept numbers and special chars !@#$%
//The user must be between 3 and 20 chars and the password between 4 and 20 chars
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
//////////////////////////////////////////

const NewUserForm = () => {

    const [addNewUser, {//we can use addNewUser function, it is not called immediately
        //and we also get the status of the call
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()
    //here we are going to use useState hooks to set the new user, validate it and post it
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"]) //the default is employee, every worker in the company is an employee

    useEffect(() => {//validating username via test method of regex
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {//validating password via test method of regex
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {//check is success
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users') //if success then we can navigate back to the users list
        }
    }, [isSuccess, navigate])

    //////////////////////////////////////////////////////////
    //These are the event handlers, which get the username and password
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    //////////////////////////////////////////////////////////

    //save all of the roles the user will obtain
    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    //check if all of the array items are true-> the user has atleast one role, the username and password are valid
    //also check that the status is not loading anymore
    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()//prevent the default of the event-> lec5/6 will not work without it
        if (canSave) {//if the canSave value is true, we can now add the new user
            await addNewUser({ username, password, roles })
        }
    }

    //we are passing all of the roles, mapping through them and adding each role to its option
    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    //classes that we will want to apply in cetrain conditions such as wrong username or password, error, invalid roles etc.
    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    //now we can show the content
    //we are creating a form that will create a new user
    //if some of the information we need to provide is wrong/missing the submit button will be disabled
    //username must be 3-20 letters, we also test that with regex
    //password must be 3-12 chars, also tested with regex
    //roles selection tag so the user roles can be selected and applied to the array
    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New User</h2>
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
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

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

export default NewUserForm