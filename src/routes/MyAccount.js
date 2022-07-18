import Logout from "./components/Logout";

const MyAccount = ({ token, setToken, setUsername }) => {
    return (
      <main>
        <h2>My Account</h2>
        <Logout token={token} setToken={setToken} setUsername={setUsername}/>
      </main>
    );
  }

export default MyAccount;