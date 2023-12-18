import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { UserType } from "../../types/UserType";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";

function User() {
  const [status, setStatus] = useState(100);
  const [data, setData] = useState<[]>();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      const respons = await axios.get(
        `https://reqres.in/api/users?page=${currentPage}`
      );
      if (respons.status === 200) {
        setData(respons.data.data);
        setStatus(200);
      }
      setTotalPages(respons.data.total_pages);
    }
    fetchUserData();
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  function handleUserClick(userID: number) {
    setSelectedUserId(userID);
    navigate(`/user/${userID}`);
  }
  console.log(selectedUserId);
  if (status === 100) return <Loader />;
  return (
    <div>
      <div className="container mx-auto py-6 w-11/12 mt-7">
        <table className="w-10/12 m-auto border-collapse border border-gray-300 shadow-lg mt-5">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Full name</th>
              <th className="border border-gray-300 px-4 py-2">
                Email address
              </th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user: UserType) => (
              <tr
                className="text-center h-20 text-slate-600"
                onClick={() => handleUserClick(user.id)}
              >
                <td className="border border-gray-300 px-4 py-2 w-13">
                  <img
                    className="w-16 h-16 rounded-full m-auto"
                    src={user.avatar}
                    alt="pic"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 w-20">
                  {user.first_name} {user.last_name}
                </td>
                <td className="border border-gray-300 px-4 py-2 w-30 ">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">Ceo</td>
                <td className="border border-gray-300 px-4 py-2">20$</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="w-16 h-10 bg-green-500 rounded-xl text-white">
                    online
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default User;
