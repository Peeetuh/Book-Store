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
  NotFoundPage,
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

import Burger from "./routes/components/Burger";

import Footer from "./routes/components/Footer";

import img1 from "./routes/components/Images/logo.png";

function App() {
  const [username, setUsername] = useState(
    window.localStorage.getItem("username") || ""
  );
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
  const [isAdmin, setIsAdmin] = useState(
    window.localStorage.getItem("isAdmin")
  );
  const [searchQuery, setSearchQuery] = useState("no-search-parameters-given");
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
    "Rom-Com",
    "Classic",
    "Historical-Fiction"
  ]);
  const [genreSelect, setGenreSelect] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [cartToast, setCartToast] = useState(false);
  const [cartItem, setCartItem] = useState({});
  return (
    <div className="App">
      <nav className="nav-bar">
        <img src={img1} alt="logo" className="logo" />
        <Burger token={token}/>
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
          <Link className="links" to={`/${userId}/cart`}>
            Cart
          </Link>
        ) : (
          <Link className="links" to="/GuestCart">
            Cart
          </Link>
        )}
        {token && (isAdmin === true || isAdmin === "true") ? (
          <Link className="links" to="/admin">
            Admin
          </Link>
        ) : null}
        {token ? (
          <Link className="links" to="/logout">
            Logout
          </Link>
        ) : null}
        <div className="nav-bar-search">
          <SearchBar
            setIsLoading={setIsLoading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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
              setGuestCart={setGuestCart}
              toast={toast}
              setToast={setToast}
              cartToast={cartToast}
              setCartToast={setCartToast}
              cartItem={cartItem}
              setCartItem={setCartItem}
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
              guestCart={guestCart}
              setGuestCart={setGuestCart}
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
              userId={userId}
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
          element={
            <GuestCart
              guestCart={guestCart}
              setGuestCart={setGuestCart}
              setIsLoading={setIsLoading}
            />
          }
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
              setGuestCart={setGuestCart}
              cartToast={cartToast}
              setCartToast={setCartToast}
              cartItem={cartItem}
              setCartItem={setCartItem}
            />
          }
        />
        <Route
          path="/authors/:authorName"
          element={
            <Author
              userId={userId}
              setIsLoading={setIsLoading}
              setGuestCart={setGuestCart}
              cartToast={cartToast}
              setCartToast={setCartToast}
              cartItem={cartItem}
              setCartItem={setCartItem}
              token={token}
            />
          }
        />
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
        <Route
          path="/SearchResult"
          element={<SearchResult searchQuery={searchQuery} />}
        />
        <Route
          path="/logout"
          element={
            <Logout
              token={token}
              setToken={setToken}
              setUsername={setUsername}
              setUserId={setUserId}
              setIsAdmin={setIsAdmin}
              setToast={setToast}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
