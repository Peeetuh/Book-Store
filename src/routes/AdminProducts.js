import { useEffect, useState } from "react";

import { paginatedBooksData } from "../api/admin";
import DisplayPaginatedBooks from "./admin/DisplayPaginatedBooks";
import AddNewBookModal from "./admin/AddNewBookModal";
import DeactivateBookModal from "./admin/DeactivateBookModal";
import EditBookModal from "./admin/EditBookModal";

const AdminProducts = ({ token }) => {
  const [booksData, setBooksData] = useState([]);
  const [currentBookId, setCurrentBookId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newBookModal, setNewBookModal] = useState(false);
  const [editBookModal, setEditBookModal] = useState(false);
  const [deactivateBookModal, setDeactivateBookModal] = useState(false);
  useEffect(() => {
    const fetchBooksData = async () => {
      const books = await paginatedBooksData(token, currentPage);
      console.log("books:", books);
      setBooksData(books);
    };
    fetchBooksData();
  }, []);
  return (
    <div>
      <h4>Manage Products</h4>
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
        />
      )}
      {editBookModal && (
        <EditBookModal
          token={token}
          currentBookId={currentBookId}
          setEditBookModal={setEditBookModal}
        />
      )}
      {}
      <DisplayPaginatedBooks
        token={token}
        booksData={booksData}
        setBooksData={setBooksData}
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
