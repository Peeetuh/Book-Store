import { allUsersRequest, promoteUserRequest } from "../../api/admin";

const UsersPromoteButton = ({token, userId, setAllUsersData}) => {
  const submitHandler = async(e)=> {
    e.preventDefault();
    const result = await promoteUserRequest(token, userId);
    console.log ("promote user:", result);
    const users = await allUsersRequest(token);
    setAllUsersData(users);
  }
  return (
    <form onSubmit={submitHandler}>
      <button type="submit">Promote</button>
    </form>
  )
}

export default UsersPromoteButton;