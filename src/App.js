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
  Genres,
} from "./routes";
import "./App.css";
import {
  Loading,
  Logout,
  SearchBar,
  SearchResult,
  DisplayGenreBooks,
  Author,
} from "./routes/components/";

import Footer from "./routes/components/Footer";

import img1 from "./routes/components/Images/logo.png";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [username, setUsername] = useState(
    window.localStorage.getItem("username") || ""
  );
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
  const [isAdmin, setIsAdmin] = useState(
    window.localStorage.getItem("isAdmin")
  );
  const [guestCart, setGuestCart] = useState(
    JSON.parse(window.localStorage.getItem("GuestCartData")) || []
  );
  const [genres] = useState([
    "Horror",
    "Science-Fiction",
    "Thriller",
    "General Fiction",
    "Comedy",
    "Romance",
    "Mystery",
  ]);
  const [genreSelect, setGenreSelect] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          <Link className="links" to={`/${userId}/cart`}>Cart</Link>
        ) : (
          <Link className="links" to="/GuestCart">Cart</Link>
        )}
        {token && isAdmin && (
          <Link className="links" to="/admin">
            Admin
          </Link>
        )}
        {token ? <Link className="links" to="/logout">Logout</Link> : null}
        <div className="nav-bar-search">
          <SearchBar
            setIsLoading={setIsLoading}
            setSearchResult={setSearchResult}
          />
        </div>
      </nav>
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setIsLoading={setIsLoading}
              userId={userId}
              username={username}
              token={token}
            />
          }
        />
        <Route
          path="Login"
          element={
            <Login
              setIsLoading={setIsLoading}
              setToken={setToken}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              setUserId={setUserId}
              setIsAdmin={setIsAdmin}
            />
          }
        />
        <Route
          path="Register"
          element={
            <Register
              setIsLoading={setIsLoading}
              setToken={setToken}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              setUserId={setUserId}
              guestCart={guestCart}
              setGuestCart={setGuestCart}
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
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/genres"
          element={<Genres genres={genres} setGenreSelect={setGenreSelect} />}
        />
        <Route
          path="/genres/:genre"
          element={
            <DisplayGenreBooks
              setIsLoading={setIsLoading}
              genreSelect={genreSelect}
            />
          }
        />
        <Route
          path="GuestCart"
          element={<GuestCart guestCart={guestCart} setGuestCart={setGuestCart} setIsLoading={setIsLoading} />}
        />
        <Route
          path={`/${userId}/cart`}
          element={
            <UserCart
              setIsLoading={setIsLoading}
              userId={userId}
              username={username}
              token={token}
            />
          }
        />
        <Route
          path="books/:bookId"
          element={
            <SingleBookPage
              setIsLoading={setIsLoading}
              token={token}
              userId={userId}
            />
          }
        />
        <Route
          path="/authors/:authorName"
          element={<Author setIsLoading={setIsLoading} />}
        />
        <Route path="/authors/:authorName" element={<Author />} />
        <Route path="/admin" element={<Admin />}>
          <Route
            path="/admin/users"
            element={<AdminUsers setIsLoading={setIsLoading} token={token} />}
          />
          <Route
            path="/admin/orders"
            element={<AdminOrders setIsLoading={setIsLoading} token={token} />}
          />
          <Route
            path="/admin/products"
            element={
              <AdminProducts setIsLoading={setIsLoading} token={token} />
            }
          />
        </Route>
        {/* <Route path="/CartForm" element={<CartForm />} /> */}
        <Route
          path="/SearchResult"
          element={<SearchResult searchResult={searchResult} />}
        />
        <Route
          path="/logout"
          element={
            <Logout
              token={token}
              setToken={setToken}
              setUsername={setUsername}
              setUserId={setUserId}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
