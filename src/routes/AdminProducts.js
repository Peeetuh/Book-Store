import { useEffect, useState } from "react";

import { paginatedBooksData, productCountRequest } from "../api/admin";
import DisplayPaginatedBooks from "./admin/DisplayPaginatedBooks";
import AddNewBookModal from "./admin/AddNewBookModal";
import DeactivateBookModal from "./admin/DeactivateBookModal";
import EditBookModal from "./admin/EditBookModal";

const AdminProducts = ({ token, setIsLoading }) => {
  const [booksData, setBooksData] = useState([]);
  const [currentBookId, setCurrentBookId] = useState("");
  const [pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newBookModal, setNewBookModal] = useState(false);
  const [editBookModal, setEditBookModal] = useState(false);
  const [deactivateBookModal, setDeactivateBookModal] = useState(false);
  useEffect(() => {
    const fetchBooksData = async () => {
      setIsLoading(true);
      try {
        const count = await productCountRequest();
        const books = await paginatedBooksData(token, currentPage);
        setPages(Math.ceil(count / 100));
        setBooksData(books);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooksData();
  }, [currentPage, token, setIsLoading]);
  return (
    <div>
      {newBookModal && (
        <AddNewBookModal
          setIsLoading={setIsLoading}
          token={token}
          setNewBookModal={setNewBookModal}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setBooksData={setBooksData}
        />
      )}
      {deactivateBookModal && (
        <DeactivateBookModal
          setIsLoading={setIsLoading}
          token={token}
          setDeactivateBookModal={setDeactivateBookModal}
          currentBookId={currentBookId}
          currentPage={currentPage}
          setBooksData={setBooksData}
        />
      )}
      {editBookModal && (
        <EditBookModal
          setIsLoading={setIsLoading}
          token={token}
          currentBookId={currentBookId}
          setEditBookModal={setEditBookModal}
          currentPage={currentPage}
          setBooksData={setBooksData}
        />
      )}
      {}
      <DisplayPaginatedBooks
      setIsLoading={setIsLoading}
        token={token}
        booksData={booksData}
        setBooksData={setBooksData}
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setNewBookModal={setNewBookModal}
        setDeactivateBookModal={setDeactivateBookModal}
        setEditBookModal={setEditBookModal}
        setCurrentBookId={setCurrentBookId}
      />
    </div>
  );
};

export default AdminProducts;
