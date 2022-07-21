import { Link, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import MyAccount from "./routes/MyAccount";
import Register from "./routes/Register";
import './App.css';


function App() {
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
        <Link to="/Home">Home</Link> |
        <Link to="/Login">Login</Link> |
        <Link to="/Register">Register</Link> |
        <Link to="/MyAccount">My Account</Link> |
      </nav>
      </>

      <>
      <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="MyAccount" element={<MyAccount />} />
      </Routes>
      </>

    </div>
  )
}

export default App;
