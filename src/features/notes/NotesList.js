import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"

//this component will create the notes table, this is the skeleton of the table that will include the headers, and the body of the table will be dynamically put in the table for each note that exists in the DB/
const NotesList = () => {
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 25000, //refreshes the notes list every 25 seconds
        refetchOnFocus: true,
        refetchOnMountOrArgChanges: true
    })

    let content
    //if the content is loading, dispaly "Loading..."
    if (isLoading) content = <p>Loading...</p>
    //if theres an error display the error
    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>//error?.data?.message checks if theres an error, if so it will display the error message, if not checks if theres data, if so it will display the data, if not it will display nothing
    }
    //checks if the notes are loaded successfully, if so assign the ids to the notes and create the table with each id as a row.
    //first the headers are created, and then in the table body we create the table content where we create the note with the Note component and drill down the noteId which in the Note component will be handled to diplay the note.
    if (isSuccess) {
        const { ids } = notes

        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null

        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__updated">Updated</th>
                        <th scope="col" className="table__th note__title">Title</th>
                        <th scope="col" className="table__th note__username">Owner</th>
                        <th scope="col" className="table__th note__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default NotesList