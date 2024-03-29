import UsersPromoteButton from "./UsersPromoteButton";
import { paginatedUsersRequest } from "../../api/admin";

const DisplayPaginatedUsers = ({
  setIsLoading,
  token,
  usersData,
  setUsersData,
  pages,
  currentPage,
  setCurrentPage,
  setDeactivateModal,
  setCurrentUserId,
}) => {
  const prevClickHandler = async (e) => {
    setIsLoading(true);
    try {
      setCurrentPage(currentPage - 1);
      const users = await paginatedUsersRequest(token, currentPage - 1);
      setUsersData(users);
    } finally {
      setIsLoading(false);
    }
  };
  const nextClickHandler = async (e) => {
    setIsLoading(true);
    try {
      setCurrentPage(currentPage + 1);
      const users = await paginatedUsersRequest(token, currentPage + 1);
      setUsersData(users);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section>
      <header className="inline">
        <h3>Showing Users</h3>
      </header>
      <div>
        <table>
          <tbody>
            <tr>
              <th>User Id#</th>
              <th>Email</th>
              <th>Address: Street</th>
              <th>Address: City</th>
              <th>Address: State</th>
              <th>Address: Zip</th>
              <th>Status</th>
              <th>Make Admin</th>
              <th>Deactivate User</th>
            </tr>
            {usersData.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.street || "-"}</td>
                  <td>{user.city || "-"}</td>
                  <td>{user.state || "-"}</td>
                  <td>{user.zip || "-"}</td>
                  <td>
                    {/* {user.isAdmin ? (
                      "Administrator"
                    ) ? !user.isActive ? (
                      <b>Deactivated</b>
                    ) ? !user.isGuest (
                      <b>Deactivated</b>
                    ) : 'Active Guest'} */}
                    {user.isAdmin ? (
                      "Administrator"
                    ) : !user.isActive ? (
                      <b>Deactivated</b>
                    ) : user.isGuest ? (
                      "Active Guest"
                    ) : (
                      "Active User"
                    )}
                  </td>
                  <td>
                    {user.isAdmin || !user.isActive ? (
                      "-"
                    ) : (
                      <UsersPromoteButton
                        token={token}
                        userId={user.id}
                        setUsersData={setUsersData}
                        currentPage={currentPage}
                      />
                    )}
                  </td>
                  <td>
                    {user.isActive && !user.isAdmin ? (
                      <button
                        onClick={(e) => {
                          setDeactivateModal(true);
                          setCurrentUserId(user.id);
                        }}
                      >
                        Deactivate
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          {currentPage !== 1 ? (
            <button onClick={prevClickHandler}>Prev</button>
          ) : (
            <button disabled>Prev</button>
          )}
          <span>
            {" "}
            | {currentPage} of {pages} |{" "}
          </span>
          {currentPage !== pages ? (
            <button onClick={nextClickHandler}>Next</button>
          ) : (
            <button disabled>Next</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DisplayPaginatedUsers;
