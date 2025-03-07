import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import fetchUsers from "../../../features/user/actions/fetchUsers";
import { THead } from "../../../components/Table/THead";
import { TBody } from "../../../components/Table/TBody";
import deleteUser from "../../../features/user/actions/deleteUser";
import AddUser from "./AddUser";

export default function ManageUsers() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const columns = ["id", "username", "email", "full_name", "role"];
  const { users } = useSelector((state) => state.users);

  const fetchData = useCallback(
    (page) => {
      dispatch(fetchUsers({ page, size: 5, sortBy: "id" }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  useEffect(() => {
    if (users?.page?.totalPages) {
      setTotalPages(users.page.totalPages);
    }
  }, [users]);

  const handleUpdate = (id) => {
    console.log("Edit user with ID:", id);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    window.location.reload();

  };

  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Manage Users</h1>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            onClick={() =>setShowModal(true)}
          >
            + Add New User
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
          <table className="min-w-full table-auto border-collapse text-sm">
            <THead columns={columns} />
            <TBody
              data={users?.content || []}
              columns={columns}
              editLine={handleUpdate}
              dropLine={handleDelete}
            />
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
    <AddUser showModal={showModal} setShowModal={setShowModal}/>
    </>
    
  );
}
