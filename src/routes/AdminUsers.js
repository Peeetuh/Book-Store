import { useEffect, useState } from "react";
import { paginatedUsersRequest, usersCountRequest } from "../api/admin";
import DeactivateUserModal from "./admin/DeactivateUserModal";
import DisplayPaginatedUsers from "./admin/DisplayPaginatedUsers";

const AdminUsers = ({ token, setIsLoading }) => {
  const [usersData, setUsersData] = useState([]);
  const [pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  useEffect(() => {
    const fetchUsersData = async () => {
      setIsLoading(true);
      try {
        const count = await usersCountRequest();
        const users = await paginatedUsersRequest(token, currentPage);
        console.log("Users:", users);
        setPages(Math.ceil(count / 100));
        setUsersData(users);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsersData();
  }, [currentPage, token, setIsLoading]);
  return (
    <>
      {deactivateModal && (
        <DeactivateUserModal
          setIsLoading={setIsLoading}
          token={token}
          currentUserId={currentUserId}
          currentPage={currentPage}
          setUsersData={setUsersData}
          setDeactivateModal={setDeactivateModal}
        />
      )}
      <div>
        <DisplayPaginatedUsers
          setIsLoading={setIsLoading}
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
