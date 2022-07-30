import { deactivateUserRequest, paginatedUsersRequest } from "../../api/admin";

const DeactivateUserModal = ({token, currentUserId, currentPage, setUsersData, setDeactivateModal}) => {
  const deactivateHandler = async(e) => {
    e.preventDefault();
    const result = await deactivateUserRequest(token, currentUserId);
    console.log("result of deactivating user:", result);
    const users = await paginatedUsersRequest(token, currentPage);
    setUsersData(users);
    setDeactivateModal(false);
  }
  return (
    <>
    <div className="background"/>
    <div className="modal">
      <h3>Deactivating User</h3>
      <p>This will permanently disable the user's account. Are you sure?</p>
      <button onClick={((e) => {
        e.preventDefault();
        setDeactivateModal(false);
      })}>Cancel</button>
      <button onClick={deactivateHandler}>Submit</button>
    </div>
    </>
  )
}

export default DeactivateUserModal;