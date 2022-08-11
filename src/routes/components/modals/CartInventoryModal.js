const CartInventoryModal = ({ setCartModal, title, inventory }) => {
  const clickHandler = () => {
    setCartModal(false);
  };

  return (
    <>
      <div className="background" onClick={clickHandler} />
      <div className="modal">
        <header>
          <h2>Uh-Oh!</h2>
        </header>
        <p>
          <b>Max Inventory Exceeded:</b> Only {inventory} copies of <i>{title}</i> are available in our warehouse.<br />
          Please try again!
        </p>
        <div>
          <button onClick={clickHandler}>Okay</button>
        </div>
      </div>
    </>
  );
};

export default CartInventoryModal;
