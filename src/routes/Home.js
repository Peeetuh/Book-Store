import { useState } from "react";
import { addBookToCart } from "../api";
import CartForm from "./components/CartForm";

const Home = ({userId, token}) => {
  const mapTest = [1, 2, 3, 4];

  return (
    <>
      {mapTest.map((book) => {
        return (
          <div key={book}>
            <h3>{book}</h3>
            <CartForm userId={userId} token={token}/>
          </div>
        );
      })}
    </>
  );
};

export default Home;
