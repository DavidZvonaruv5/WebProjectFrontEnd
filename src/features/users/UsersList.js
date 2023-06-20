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
  } = useGetUsersQuery('usersList', { //if changes will be made on one screen, and the other is on the same screen, until he refreshes the screen he won't see a change, this will make him see the change, it will requery his screeen
    pollingInterval: 60000, //every minute it will requery the data
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })
  
  let content

  //check if the content is loading, if so, display the loading message
  if (isLoading) content = <p>Loading...</p>

  //if there's an error, display the error message on the screen
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  //
  if (isSuccess) {
    const { ids } = users
    const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)
    //this will display a table with all of the users, the table will have username, roles and edit headers
    //in each row of the table we will display a mapped by each of the users ids
    //for each user we are creating a User component where we're passing down the id as a prop
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
