import { deleteFromCart, fetchUsersCart } from "../../api";

const DeleteFromCartButton = ({token, userCart, setUserCart, cart}) => {
  const deleteHandler = async() => {
    console.log(userCart, cart);
    await deleteFromCart(userCart.orderId, cart.bookId, cart.bookPrice, cart.quantity);
    const fetchedCart = await fetchUsersCart(token);
    setUserCart(fetchedCart);
  }

  return (
    <button className="delete-from-cart" onClick={deleteHandler}>Delete</button>
  )
}

export default DeleteFromCartButton;