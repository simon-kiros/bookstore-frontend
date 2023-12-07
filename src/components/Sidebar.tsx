import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function Sidebar() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("tag"));
  }, [searchParams]);

  return (
    <div className="mt-3 fs-7 sidebar">
      <div className="list-group">
        <b className="list-group-item list-group-item-action text-dark heading mb-0">
          Book Tags
        </b>
        <Link
          to="?tag=all"
          className={`list-group-item list-group-item-action ${
            searchParams.get("tag") === "all" ||
            searchParams.get("tag") === null
              ? "active"
              : ""
          }`}
        >
          All Books
        </Link>

        <Link
          to="?tag=fiction"
          className={`list-group-item list-group-item-action ${
            searchParams.get("tag") === "fiction" ? "active" : ""
          }`}
        >
          Fiction
        </Link>

        <Link
          to="?tag=non-fiction"
          className={`list-group-item list-group-item-action ${
            searchParams.get("tag") === "non-fiction" ? "active" : ""
          }`}
        >
          Non-Fiction
        </Link>
        <Link
          to="?tag=science"
          className={`list-group-item list-group-item-action ${
            searchParams.get("tag") === "science" ? "active" : ""
          }`}
        >
          Science
        </Link>
        <Link
          to="?tag=essay"
          className={`list-group-item list-group-item-action ${
            searchParams.get("tag") === "essay" ? "active" : ""
          }`}
        >
          Essay
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
