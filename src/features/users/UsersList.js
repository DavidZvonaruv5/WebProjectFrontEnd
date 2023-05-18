import { useGetUsersQuery } from "./usersApiSlice"; //to execute getUsers query
import User from "./User"; //to display the user data

const UsersList = () => {
  // Destructuring properties from useGetUsersQuery hook result
  //uses the useGetUsersQuery hook to fetch the users data
  const {
    data: users, //data receieved----> normalized data of course
    isLoading, //if the query not finished loading
    isSuccess, //if the query was successful
    isError, //if theres an error in the query
    error //contains the error object with the error message
  } = useGetUsersQuery(undefined, { //if changes will be made on one screen, and the other is on the same screen, until he refreshes the screen he won't see a change, this will make him see the change, it will requery his screeen
    pollingInterval: 60000, //every minute it will requery the data
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })
  
  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = users
    const tableContent = ids?.length ? ids.map(userId => <User key={userId} userId={userId} />) : null
    
    content = (
      <table className="table table--users">
      <thead className="table__thead">
          <tr>
              <th scope="col" className="table__th user__username">Username</th>
              <th scope="col" className="table__th user__roles">Roles</th>
              <th scope="col" className="table__th user__edit">Edit</th>
          </tr>
      </thead>
      <tbody>
          {tableContent}
      </tbody>
  </table>
  )
  }
  
  //content will recieve the components state based on the actual state of the query.
  //if the query is loading - loading will be displayed
  //if there's an error, the error message will display
  //otherwise the table will display
  //the table is flattned and showed as a table via grid in the css, this is a more useful and flexible way to play around with the content.
  
 return content
};

export default UsersList;
