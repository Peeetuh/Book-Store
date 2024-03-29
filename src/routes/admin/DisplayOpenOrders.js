import {
  paginatedOrdersRequest,
  openOrdersRequest,
  closedOrdersRequest,
  openOrdersCountRequest,
} from "../../api/admin";

const DisplayOpenOrders = ({
  setIsLoading,
  token,
  openOrdersData,
  setOrdersData,
  setOpenOrdersData,
  setClosedOrdersData,
  currentPage,
  setCurrentPage,
  pages,
  setPages
}) => {
  const allClickHandler = async (e) => {
    e.preventDefault();
    setClosedOrdersData([]);
    setOpenOrdersData([]);
    const orders = await paginatedOrdersRequest(token, 1);
    console.log(orders);
    setOrdersData(orders);
    setCurrentPage(1);
  };
  const openClickHandler = async (e) => {
    e.preventDefault();
    setOrdersData([]);
    setClosedOrdersData([]);
    const count = await openOrdersCountRequest();
    const open = await openOrdersRequest(token, 1);
    setPages(Math.ceil(count/100));
    setOpenOrdersData(open);
    setCurrentPage(1);
  };
  const closedClickHandler = async (e) => {
    e.preventDefault();
    setOrdersData([]);
    setOpenOrdersData([]);
    const closed = await closedOrdersRequest(token, 1);
    setClosedOrdersData(closed);
    setCurrentPage(1);
  };
  const prevClickHandler = async (e) => {
    setIsLoading(true);
    try {
      setOrdersData([]);
      setClosedOrdersData([]);
      const orders = await openOrdersRequest(token, currentPage - 1);
      setOpenOrdersData(orders);
      setCurrentPage(currentPage - 1);
    } finally {
      setIsLoading(false);
    }
  };
  const nextClickHandler = async (e) => {
    setIsLoading(true);
    try {
      setOrdersData([]);
      setClosedOrdersData([]);
      const orders = await openOrdersRequest(token, currentPage + 1);
      setOpenOrdersData(orders);
      setCurrentPage(currentPage + 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <header className="inline">
        <h3>Showing Orders: Open</h3>
        <div className="order-buttons">
          <span>Filter by:</span>
          <button onClick={allClickHandler}>All</button>
          <button onClick={openClickHandler}>Open</button>
          <button onClick={closedClickHandler}>Closed</button>
        </div>
      </header>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Order ID#</th>
              <th>User ID#</th>
              <th>User Email</th>
              <th>Order Price</th>
              <th>Order Status</th>
            </tr>
            {openOrdersData.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td>{order.userEmail}</td>
                  <td>{order.orderPrice}</td>
                  <td>{order.isComplete ? "Closed" : "Open"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          {currentPage !== 1 ? (
            <button onClick={prevClickHandler}>Prev</button>
          ) : (
            <button disabled>Prev</button>
          )}
          <span>
            {" "}
            | {currentPage} of {pages} |{" "}
          </span>
          {currentPage !== pages ? (
            <button onClick={nextClickHandler}>Next</button>
          ) : (
            <button disabled>Next</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DisplayOpenOrders;
