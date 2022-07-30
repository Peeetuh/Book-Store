import { paginatedUsersRequest, promoteUserRequest } from "../../api/admin";

const UsersPromoteButton = ({token, userId, setUsersData, currentPage}) => {
  const submitHandler = async(e)=> {
    e.preventDefault();
    const result = await promoteUserRequest(token, userId);
    console.log ("promote user:", result);
    const users = await paginatedUsersRequest(token, currentPage);
    setUsersData(users);
  }
  return (
    <form onSubmit={submitHandler}>
      <button type="submit">Promote</button>
    </form>
  )
}

export default UsersPromoteButton;