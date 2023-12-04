import React, { useCallback } from "react";
import axios from "axios";
import "./ListingAndSearch.css"; 
import { useEffect, useState } from "react";
import Card from "./card"; 
import Pagination from "./Pagination";
import { BsSearch } from "react-icons/bs";

function ListingAndSearchPage() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = (...args) => {
    axios
      .get(
        `https://api.jikan.moe/v4/characters?page=${currentPage}&limit=15&q=${args}&order_by=favorites&sort=desc`
      )
      .then(
        (response) => {
          const result = response.data;
          setData(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(getData, [currentPage]);

  const handleSearch = (event) => {
    event.preventDefault();
    const { value } = event.target;
    getData(value);
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 200);
    };
  };

  const updateCurrentPage = (currentPage, target, lastPage) => {
    switch (target) {
      case "Prev": {
        currentPage > 1 &&
          setCurrentPage((currentPage) => parseInt(currentPage) - 1);
        break;
      }
      case "First": {
        setCurrentPage(currentPage);
        break;
      }
      case "Next": {
        currentPage <= lastPage &&
          setCurrentPage((currentPage) => parseInt(currentPage) + 1);
        break;
      }
      case "Last": {
        setCurrentPage(currentPage);
        break;
      }
      case "custom": {
        currentPage <= lastPage && currentPage > -1
          ? setCurrentPage(currentPage)
          : alert("Please enter a valid page number");
        break;
      }
      default:
        setCurrentPage(currentPage);
        break;
    }
  };

  const optimisedVersion = useCallback(debounce(handleSearch), []);

  return (
    <div className="Container">
      <div className="Top">
        <h1 className="Title">Search Anime Characters</h1>
        <div className="Searchbox">
          <span className="Searchicon">
            <BsSearch />
          </span>
          <input
            type="text"
            name="search box"
            onChange={optimisedVersion}
            placeholder="Search anime characters..."
            className="Inputbox"
          />
        </div>
        <p>
          Total
          <strong> {data?.pagination?.items?.total} </strong>
          matching anime characters found
        </p>
      </div>

      <div className="Middle">
        <Card characterData={data} />
      </div>
      <div>
        <Pagination
          paginationData={data}
          updateCurrentPage={updateCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default ListingAndSearchPage;
