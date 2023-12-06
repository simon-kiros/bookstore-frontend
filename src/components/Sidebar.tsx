import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="mt-3 fs-7 sidebar">
      <div className="list-group">
        <b className="list-group-item list-group-item-action text-dark heading mb-0">
          Book Tags
        </b>
        <Link to="?tag=all" className="list-group-item list-group-item-action">
          All Books
        </Link>

        <Link
          to="?tag=fiction"
          className="list-group-item list-group-item-action"
        >
          Fiction
        </Link>

        <Link
          to="?tag=non-fiction"
          className="list-group-item list-group-item-action"
        >
          Non-Fiction
        </Link>
        <Link
          to="?tag=science"
          className="list-group-item list-group-item-action"
        >
          Science
        </Link>
        <Link
          to="?tag=essay"
          className="list-group-item list-group-item-action"
        >
          Essay
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
