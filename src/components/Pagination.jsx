import React from "react";

const Pagination = ({
  donationsPerPage,
  totalCountDonations,
  currentPaginationPage,
  setCurrentPaginationPage,
  indexOfFirstDonation,
  indexOfLastDonation
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountDonations / donationsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        class="button is-dark pagination-previous"
        onClick={() => setCurrentPaginationPage(currentPaginationPage - 1)}
        disabled={pageNumbers[0] === currentPaginationPage ? `true` : ``}
      >
        <span class="icon is-small">
          <i class="fas fa-angle-double-left"></i>
        </span>
        <span>Previous</span>
      </button>
      <button
        class="button is-info pagination-next"
        onClick={() => setCurrentPaginationPage(currentPaginationPage + 1)}
        disabled={
          pageNumbers[pageNumbers.length - 1] === currentPaginationPage
            ? `true`
            : ``
        }
      >
        <span>Next Page</span>
        <span class="icon is-small">
          <i class="fas fa-angle-double-right"></i>
        </span>
      </button>
      <ul className="pagination-list">
        {pageNumbers.map(number => {
          return (
            <li key={number}>
              <a
                className={`pagination-link ${
                  currentPaginationPage === number ? "is-current" : null
                }`}
                onClick={() => setCurrentPaginationPage(number)}
              >
                {number}
              </a>
            </li>
          );
        })}
        {/* <li>
          <a
            className="pagination-link is-current"
            aria-label="Page 1"
            aria-current="page"
          >
            1
          </a>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 2">
            2
          </a>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 3">
            3
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default Pagination;
