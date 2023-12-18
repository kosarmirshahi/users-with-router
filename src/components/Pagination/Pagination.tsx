import React from "react";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function handleLowPageNumber() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    else return;
  }
  function handleAddPageNumber() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    else return;
  }
  return (
    <nav className="flex justify-center my-4">
      <ul className="flex">
        <button
          className="text-xl text-cyan-600 mr-1.5"
          onClick={handleLowPageNumber}
        >
          {"<"}
        </button>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } font-semibold rounded-full w-8 h-8 mx-1 hover:bg-sky-700 duration-700`}
            >
              {number}
            </button>
          </li>
        ))}
        <button
          className="text-xl text-cyan-600 ml-1.5"
          onClick={handleAddPageNumber}
        >
          {">"}
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
