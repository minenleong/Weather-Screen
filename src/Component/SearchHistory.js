import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import "./WeatherScreen.scss";

function SearchHistory({ history }) {
  return (
    <div className="search-history">
      <h2>Search History</h2>
      <ul className="history-list">
        {history.map((entry, index) => (
          <li key={index}>
            <span className="city-name">City: {entry.cityName}</span>
            <span className="country-name">Country: {entry.countryName}</span>
            <BiSearchAlt />
            <RiDeleteBinLine />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
