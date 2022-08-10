const AddToCartToast = ({ setCartToast, cartItem }) => {
  const clickHandler = () => {
    setCartToast(false);
  };
  return (
    <>
      <div className="toast-background" onClick={clickHandler} />
      <div className="toast-cart">
        <header>
          <h4>Cart Updated</h4>
        </header>
        <div>
          <p>
            Added to cart:
            <br />
            <b>
              <i>{cartItem.title}</i>
            </b>{" "}
            | ${cartItem.price}, Qt: {cartItem.bookQuantity}
          </p>
        </div>
      </div>
    </>
  );
};

export default AddToCartToast;
