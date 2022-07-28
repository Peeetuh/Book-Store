import { allUsersRequest, deactivateUserRequest } from "../../api/admin";

const UsersDeactivateButton = ({ token, userId, setAllUsersData }) => {
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await deactivateUserRequest(token, userId);
    console.log("result of deactivating user:", result);
    const users = await allUsersRequest(token);
    setAllUsersData(users);
  }
  return (
    <form onSubmit={submitHandler}>
      <button type="submit">Deactivate</button>
    </form>
  )
}

export default UsersDeactivateButton;