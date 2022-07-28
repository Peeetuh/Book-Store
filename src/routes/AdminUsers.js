import { useEffect, useState } from "react";
import { allUsersRequest } from "../api/admin";
import DisplayAllUsers from "./admin/DisplayAllUsers";

const AdminUsers = ({ token }) => {
  const [allUsersData, setAllUsersData] = useState([]);
  useEffect(() => {
    const fetchUsersData = async () => {
      const users = await allUsersRequest(token);
      console.log("Users:", users);
      setAllUsersData(users);
    };
    fetchUsersData();
  }, []);
  return (
    <div>
      <h3>Users Admin</h3>
     <DisplayAllUsers token={token} allUsersData={allUsersData} setAllUsersData={setAllUsersData} />
    </div>
  );
};

export default AdminUsers;