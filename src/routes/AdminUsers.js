import { useEffect, useState } from "react";
import { paginatedUsersRequest, usersCountRequest } from "../api/admin";
import DeactivateUserModal from "./admin/DeactivateUserModal";
import DisplayPaginatedUsers from "./admin/DisplayPaginatedUsers";

const AdminUsers = ({ token }) => {
  const [usersData, setUsersData] = useState([]);
  const [pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  useEffect(() => {
    const fetchUsersData = async () => {
      const count = await usersCountRequest();
      const users = await paginatedUsersRequest(token, currentPage);
      console.log("Users:", users);
      setPages(Math.ceil(count / 100));
      setUsersData(users);
    };
    fetchUsersData();
  }, [currentPage, token]);
  return (
    <>
      {deactivateModal && (
        <DeactivateUserModal
          token={token}
          currentUserId={currentUserId}
          currentPage={currentPage}
          setUsersData={setUsersData}
          setDeactivateModal={setDeactivateModal}
        />
      )}
      <div>
        <DisplayPaginatedUsers
          token={token}
          usersData={usersData}
          setUsersData={setUsersData}
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setDeactivateModal={setDeactivateModal}
          setCurrentUserId={setCurrentUserId}
        />
      </div>
    </>
  );
};

export default AdminUsers;
