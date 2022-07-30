import { useEffect, useState } from "react";

import { paginatedBooksData, productCountRequest } from "../api/admin";
import DisplayPaginatedBooks from "./admin/DisplayPaginatedBooks";
import AddNewBookModal from "./admin/AddNewBookModal";
import DeactivateBookModal from "./admin/DeactivateBookModal";
import EditBookModal from "./admin/EditBookModal";

const AdminProducts = ({ token }) => {
  const [booksData, setBooksData] = useState([]);
  const [currentBookId, setCurrentBookId] = useState("");
  const [pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newBookModal, setNewBookModal] = useState(false);
  const [editBookModal, setEditBookModal] = useState(false);
  const [deactivateBookModal, setDeactivateBookModal] = useState(false);
  useEffect(() => {
    const fetchBooksData = async () => {
      const count = await productCountRequest();
      const books = await paginatedBooksData(token, currentPage);
      setPages(Math.ceil(count/100));
      setBooksData(books);
    };
    fetchBooksData();
  }, [currentPage, token]);
  return (
    <div>
      {newBookModal && (
        <AddNewBookModal
          token={token}
          setNewBookModal={setNewBookModal}
          currentPage={currentPage}
          setBooksData={setBooksData}
        />
      )}
      {deactivateBookModal && (
        <DeactivateBookModal
          token={token}
          setDeactivateBookModal={setDeactivateBookModal}
          currentBookId={currentBookId}
          currentPage={currentPage}
          setBooksData={setBooksData}
        />
      )}
      {editBookModal && (
        <EditBookModal
          token={token}
          currentBookId={currentBookId}
          setEditBookModal={setEditBookModal}
          currentPage={currentPage}
          setBooksData={setBooksData}
        />
      )}
      {}
      <DisplayPaginatedBooks
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
