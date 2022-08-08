import {
  paginatedOrdersRequest,
  closedOrdersRequest,
  openOrdersRequest,
} from "../../api/admin";
const DisplayClosedOrders = ({
  setIsLoading,
  token,
  setOrdersData,
  closedOrdersData,
  setClosedOrdersData,
  setOpenOrdersData,
  currentPage,
  setCurrentPage,
  pages,
  filter,
  setFilter,
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
    const open = await openOrdersRequest(token, 1);
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
      setOpenOrdersData([]);
      const orders = await closedOrdersRequest(token, currentPage - 1);
      setClosedOrdersData(orders);
      setCurrentPage(currentPage - 1);
    } finally {
      setIsLoading(false);
    }
  };
  const nextClickHandler = async (e) => {
    setIsLoading(true);
    try {
      setOrdersData([]);
      setOpenOrdersData([]);
      const orders = await closedOrdersRequest(token, currentPage + 1);
      setClosedOrdersData(orders);
      setCurrentPage(currentPage + 1);
    } finally {
      setIsLoading(false);
    }
  };
  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     if (filter === "open") {
  //       const open = await openOrdersRequest(token, 1);
  //       setOpenOrdersData(open);
  //       setOrdersData([]);
  //       setClosedOrdersData([]);
  //       setCurrentPage(1);
  //     } else if (filter === "closed") {
  //       const closed = await closedOrdersRequest(token, 1);
  //       setClosedOrdersData(closed);
  //       setOrdersData([]);
  //       setOpenOrdersData([]);
  //       setCurrentPage(1);
  //     } else {
  //       setFilter("");
  //       const orders = await paginatedOrdersRequest(token, 1);
  //       setOrdersData(orders);
  //       setClosedOrdersData([]);
  //       setOpenOrdersData([]);
  //       setCurrentPage(1);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <section>
      <header className="inline">
        <h3>Showing Orders: Closed</h3>
        {/* <form onSubmit={submitHandler}>
          <label>Filter Results:</label>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Orders</option>
            <option value="open">Open Orders</option>
            <option value="closed">Closed Orders</option>
          </select>
          <button type="submit">Submit</button>
        </form> */}
        <div>
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
            {closedOrdersData.map((order) => {
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

export default DisplayClosedOrders;
