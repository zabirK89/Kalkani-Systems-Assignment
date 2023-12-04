import React, { useState, memo } from "react";
import "./pagination.css";
function Pagination({ paginationData, updateCurrentPage, currentPage }) {
  const lastPage = paginationData?.pagination?.last_visible_page;

  return (
    <div className="PaginationContainer">
      <button
        className="PaginationBtn"
        id="First"
        onClick={(e) => {
          updateCurrentPage(1, e.target.innerHTML, lastPage);
        }}
      >
        First
      </button>
      <button
        className="PaginationBtn"
        onClick={(e) => {
          updateCurrentPage(currentPage, e.target.innerHTML, lastPage);
        }}
      >
        Prev
      </button>
      <input
        className="PaginationInput"
        type="text"
        name="custom"
        value={currentPage}
        onChange={(e) =>
          updateCurrentPage(e.target.value, e.target.name, lastPage)
        }
      />
      of {lastPage} pages
      <button
        className="PaginationBtn"
        id="next"
        onClick={(e) => {
          updateCurrentPage(currentPage, e.target.innerHTML, lastPage);
        }}
      >
        Next
      </button>
      <button
        className="PaginationBtn"
        id="last"
        onClick={(e) => {
          updateCurrentPage(lastPage, e.target.innerHTML);
        }}
      >
        Last
      </button>
    </div>
  );
}

export default memo(Pagination);
