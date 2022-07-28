import UsersPromoteButton from "./UsersPromoteButton";
import UsersDeactivateButton from "./UsersDeactivateButton";

const DisplayAllUsers = ({ token, allUsersData, setAllUsersData }) => {
  return (
    <section>
      <h4>Displaying All Users</h4>
      <div>
        <table>
          <tbody>
            <tr>
              <th>User Id</th>
              <th>Email</th>
              <th>Status</th>
              <th>Make Admin</th>
              <th>Deactivate User</th>
            </tr>
            {allUsersData.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userEmail}</td>
                  <td>
                    {user.isAdmin ? (
                      "Administrator"
                    ) : user.isActive ? (
                      "Active User"
                    ) : (
                      <b>Deactivated</b>
                    )}
                  </td>
                  <td>
                    {user.isAdmin || !user.isActive ? (
                      "-"
                    ) : (
                      <UsersPromoteButton
                        token={token}
                        userId={user.id}
                        setAllUsersData={setAllUsersData}
                      />
                    )}
                  </td>
                  <td>
                    {user.isActive && !user.isAdmin ? (
                      <UsersDeactivateButton
                        token={token}
                        userId={user.id}
                        setAllUsersData={setAllUsersData}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DisplayAllUsers;
