import { Link, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import { useState } from "react";
import { MyAccount, Login, Register, GuestCart, UserCart } from "./routes";
import "./App.css";

function App() {
  const [username, setUsername] = useState(
    window.localStorage.getItem("username")
  );
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"))
  return (
    <div className="App">
      <h1>Book Store</h1>
      <>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          <Link to="/">Home</Link>
          {token ? null : <Link to="/Login">Login</Link>}
          {token ? null : <Link to="/Register">Register</Link>}
          {token ? <Link to="/MyAccount">My Account</Link> : null}
          {token ? <Link to={`/${userId}/cart`}>Cart</Link> : <Link to="/GuestCart">Cart</Link>}
        </nav>
      </>

      <>
        <Routes>
          <Route path="/" element={<Home userId={userId} token={token}/>} />
          <Route
            path="Login"
            element={
              <Login
                setToken={setToken}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                setUserId={setUserId}
              />
            }
          />
          <Route
            path="Register"
            element={
              <Register
                setToken={setToken}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                setUserId={setUserId}
              />
            }
          />
          <Route
            path="MyAccount"
            element={
              <MyAccount
                token={token}
                setToken={setToken}
                setUsername={setUsername}
                username={username}
                setUserId={setUserId}
              />
            }
          />
          <Route path="GuestCart" element={<GuestCart />} />
          <Route path={`/${userId}/cart`} element={<UserCart username={username}/>} />
        </Routes>
      </>
    </div>
  );
}

export default App;
