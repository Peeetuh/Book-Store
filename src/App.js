import { Link, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./routes/Home";
import { useState } from "react";
import {
  MyAccount,
  Login,
  Register,
  GuestCart,
  UserCart,
  SingleBookPage,
  Admin,
  AdminUsers,
  AdminOrders,
  AdminProducts,
  Genre
} from "./routes";
import "./App.css";
import {
  SearchBar,
  Horror,
  ScienceFiction,
  GeneralFiction,
  Mystery,
  Comedy,
  Romance,
  Thriller,
  SearchResult,
  CartForm,
} from "./routes/components/";

import img1 from "./routes/components/Images/logo.png";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState(
    window.localStorage.getItem("username")
  );
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  return (
    <div className="App">
      <nav className="nav-bar">
        <img src={img1} alt="logo" className="logo" />
        <Link className="links" to="/">
          Home
        </Link>
        <Link className="links" to="/Genre">
          Genre
        </Link>
        {token ? null : (
          <Link className="links" to="/Login">
            Login
          </Link>
        )}
        {token ? null : (
          <Link className="links" to="/Register">
            Register
          </Link>
        )}
        {token ? (
          <Link className="links" to="/MyAccount">
            My Account
          </Link>
        ) : null}
        {token ? (
          <Link className="links" to={`/${userId}/cart`}>Cart</Link>
        ) : (
          <Link className="links" to="/GuestCart">Cart</Link>
        )}
        {token && userData.isAdmin && <Link to="/admin">Admin</Link>}
        <div className="nav-bar-search">
          <SearchBar setSearchResult={setSearchResult} />
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home userId={userId} token={token} />} />
        <Route
          path="Login"
          element={
            <Login
              setToken={setToken}
              setUserData={setUserData}
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
        <Route path="/Genre" element={<Genre />} />
        <Route path="GuestCart" element={<GuestCart />} />
        <Route
          path={`/${userId}/cart`}
          element={<UserCart username={username} token={token} />}
        />
        <Route
          path="books/:bookId"
          element={<SingleBookPage token={token} userId={userId} />}
        />
        <Route path="/Horror" element={<Horror />} />
        <Route path="/ScienceFiction" element={<ScienceFiction />} />
        <Route path="/GeneralFiction" element={<GeneralFiction />} />
        <Route path="/Mystery" element={<Mystery />} />
        <Route path="/Thriller" element={<Thriller />} />
        <Route path="/Comedy" element={<Comedy />} />
        <Route path="/Romance" element={<Romance />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/users" element={<AdminUsers token={token} />} />
          <Route path="/admin/orders" element={<AdminOrders token={token} />} />
          <Route
            path="/admin/products"
            element={<AdminProducts token={token} />}
          />
        </Route>
        <Route path="/CartForm" element={<CartForm />} />
        <Route
          path="/SearchResult"
          element={<SearchResult searchResult={searchResult} />}
        />
      </Routes>
    </div>
  );
}

export default App;
