import { useEffect, useState } from "react";

import { ordersCountRequest, paginatedOrdersRequest } from "../api/admin";
import DisplayPaginatedOrders from "./admin/DisplayPaginatedOrders";
import DisplayOpenOrders from "./admin/DisplayOpenOrders";
import DisplayClosedOrders from "./admin/DisplayClosedOrders";

const AdminOrders = ({ token, setIsLoading }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [closedOrdersData, setClosedOrdersData] = useState([]);
  const [openOrdersData, setOpenOrdersData] = useState([]);
  const [pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchOrdersData = async () => {
      setIsLoading(true);
      try {
        const count = await ordersCountRequest();
        const orders = await paginatedOrdersRequest(token, currentPage);
        setPages(Math.ceil(count / 100));
        setOrdersData(orders);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrdersData();
  }, [currentPage, token, setIsLoading]);
  return (
    <div>
      {ordersData.length ? (
        <DisplayPaginatedOrders
          setIsLoading={setIsLoading}
          token={token}
          ordersData={ordersData}
          setOrdersData={setOrdersData}
          setClosedOrdersData={setClosedOrdersData}
          setOpenOrdersData={setOpenOrdersData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
          filter={filter}
          setFilter={setFilter}
        />
      ) : closedOrdersData.length ? (
        <DisplayClosedOrders
          setIsLoading={setIsLoading}
          token={token}
          closedOrdersData={closedOrdersData}
          setClosedOrdersData={setClosedOrdersData}
          setOpenOrdersData={setOpenOrdersData}
          setOrdersData={setOrdersData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
          filter={filter}
          setFilter={setFilter}
        />
      ) : (
        <DisplayOpenOrders
          setIsLoading={setIsLoading}
          token={token}
          openOrdersData={openOrdersData}
          setOpenOrdersData={setOpenOrdersData}
          setClosedOrdersData={setClosedOrdersData}
          setOrdersData={setOrdersData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
          filter={filter}
          setFilter={setFilter}
        />
      )}
    </div>
  );
};

export default AdminOrders;
