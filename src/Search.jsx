import React from "react";
import "./index.css";
import search from "../public/Search.svg";

export default function Search({ hundle, ss }) {
  return (
    <div className="search">
      <div>
        <img src={search} alt="Search icon" />
        <input
          type="text"
          placeholder="Search on your film"
          value={ss}
          onChange={(e) => {
            hundle(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
