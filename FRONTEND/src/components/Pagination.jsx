import React from 'react'
import '../componentStyles/Pagination.css'
import { useSelector } from 'react-redux'

function Pagination({
    currentPage,
    onPageChange,
    activeClass = 'active',
    nextPageText = "Next",
    prevPageText = 'Prev',
    firstPageText = '1st',
    lastPageText = 'last'
}) {
    const { totalPages, products } = useSelector((state) => state.product);
    if (products.length === 0 || totalPages <= 1) return null;

    //GENERATE PAGE NUMBERS
    const getPageNumbers = () => {
        const pageNumbers = [];
        const pageWindow = 2
        for (let i = Math.max(1, currentPage - pageWindow); i <= Math.min(totalPages, currentPage + pageWindow); i++) {
            pageNumbers.push(i)
        }
        return pageNumbers
    }
    return (
        <div className='pagination' >
            {/* previous and first button */}
            {
                currentPage > 1 && (
                    <>
                        <button className="pagination-btn" onClick={() => onPageChange(1)}>
                            {firstPageText}
                        </button>
                        <button className="pagination-btn" onClick={() => onPageChange(currentPage - 1)}>
                            {lastPageText}
                        </button>
                    </>
                )
            }

            {/* Display Numbers  */}
            {
                getPageNumbers().map((number) => (
                    <button className={` pagination-btn ${currentPage === number? activeClass:'' } `} key={number} onClick={() => onPageChange(number)} >{number}</button>
                ))
            }

            {/* Last and Next button */}
            {
                currentPage > totalPages && (
                    <>
                        <button className="pagination-btn" onClick={() => onPageChange(currentPage + 1)}>
                            {nextPageText}
                        </button>
                        <button className="pagination-btn" onClick={() => onPageChange(totalPages)}>
                            {lastPageText}
                        </button>
                    </>
                )
            }

        </div>
    )
}

export default Pagination





// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const Pagination = ({ currentPage, totalPages }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handlePageChange = (page) => {
//     // Get current URL params
//     const searchParams = new URLSearchParams(location.search);

//     // Update or set page param
//     searchParams.set("page", page);

//     // Navigate with updated params
//     navigate(`${location.pathname}?${searchParams.toString()}`);
//   };

//   if (totalPages <= 1) return null; // No pagination if only 1 page

//   return (
//     <div className="pagination">
//       {/* Previous Button */}
//       <button
//         disabled={currentPage === 1}
//         onClick={() => handlePageChange(currentPage - 1)}
//       >
//         Prev
//       </button>

//       {/* Page Numbers */}
//       {[...Array(totalPages)].map((_, index) => {
//         const page = index + 1;
//         return (
//           <button
//             key={page}
//             className={page === currentPage ? "active" : ""}
//             onClick={() => handlePageChange(page)}
//           >
//             {page}
//           </button>
//         );
//       })}

//       {/* Next Button */}
//       <button
//         disabled={currentPage === totalPages}
//         onClick={() => handlePageChange(currentPage + 1)}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;

