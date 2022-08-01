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
  Genres
} from "./routes";
import "./App.css";
import {
  SearchBar,
  SearchResult,
  DisplayGenreBooks,
  Author
} from "./routes/components/";

import img1 from "./routes/components/Images/logo.png";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState(
    window.localStorage.getItem("username")
  );
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
  const [genres] = useState(['Horror', 'Science-Fiction', 'Thriller', 'General Fiction', 'Comedy', 'Romance', 'Mystery'])
  const [genreSelect, setGenreSelect] = useState("");
  return (
    <div className="App">
      <nav className="nav-bar">
        <img src={img1} alt="logo" className="logo" />
        <Link className="links" to="/">
          Home
        </Link>
        <Link className="links" to="/Genres">
          Genres
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
          <Link to={`/${userId}/cart`}>Cart</Link>
        ) : (
          <Link to="/GuestCart">Cart</Link>
        )}
        {token && userData.isAdmin && <Link to="/admin">Admin</Link>}
        <div className="nav-bar-search">
          <SearchBar setSearchResult={setSearchResult} />
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home userId={userId} username={username} token={token} />} />
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
        <Route path="/genres" element={<Genres genres={genres} setGenreSelect={setGenreSelect} />} />
        <Route path="/genres/:genre" element={<DisplayGenreBooks genreSelect={genreSelect} />} />
        <Route path="GuestCart" element={<GuestCart />} />
        <Route
          path={`/${userId}/cart`}
          element={<UserCart userId={userId} username={username} token={token} />}
        />
        <Route
          path="books/:bookId"
          element={<SingleBookPage token={token} userId={userId} />}
        />
        <Route path="/authors/:authorName" element={<Author  /> } />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/users" element={<AdminUsers token={token} />} />
          <Route path="/admin/orders" element={<AdminOrders token={token} />} />
          <Route
            path="/admin/products"
            element={<AdminProducts token={token} />}
          />
        </Route>
        <Route
          path="/SearchResult"
          element={<SearchResult searchResult={searchResult} />}
        />
      </Routes>
    </div>
  );
}

export default App;
