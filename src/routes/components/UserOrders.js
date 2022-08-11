import "./UserOrders.css";

const UserOrders = ({ myAccount, myOrders, username }) => {
  return (
    <section id="users-orders-container">
      <h4>{username}'s Order History</h4>
      {myOrders.length < 1 ? (
        <p>Your order history will appear here</p>
      ) : (
        <>
          {/* <h4>Current Cart:</h4>
          {myAccount.orders
            .filter((account) => {
              return account.isComplete === false;
            })
            .map((account) => {
              return (
                <div
                  key={account.orderId}
                  className="users-orders-books-container"
                >
                  <div className="users-orders-id">
                    <p>
                      Cart Total: <b>${account.orderPrice}</b>
                    </p>
                  </div>
                  <div>
                    {account.orderDetails.map((order) => {
                      return (
                        <div
                          key={order.bookId}
                          className="users-orders-single-book"
                        >
                          <img src={order.imageLinkM} alt={order.title} />
                          <div className="single-book-details">
                            <p>
                              <i>{order.title}</i>
                            </p>
                            <p>
                              Quantity: {order.quantity} | ${order.bookPrice}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })} */}
          {myAccount.orders
            .filter((account) => {
              return account.isComplete;
            })
            .map((account) => {
              return (
                <div
                  key={account.orderId}
                  className="users-orders-books-container"
                >
                  <div className="users-orders-id">
                    <p>
                      Order Number: <b>{account.orderId}</b>
                      <br />
                      Grand Total: <b>${account.orderPrice}</b>
                    </p>
                  </div>
                  <div>
                    {account.orderDetails.map((order) => {
                      return (
                        <div
                          key={order.bookId}
                          className="users-orders-single-book"
                        >
                          <img src={order.imageLinkM} alt={order.title} />
                          <div className="single-book-details">
                            <p>
                              <i>{order.title}</i>
                            </p>
                            <p>
                              Quantity: {order.quantity} | ${order.bookPrice}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </>
      )}
    </section>
  );
};
export default UserOrders;
