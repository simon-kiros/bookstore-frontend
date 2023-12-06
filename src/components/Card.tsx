import React from "react";
import BookType from "../type/BookType";

function Card({ title, writer, cover, price, tag }: BookType) {
  // console.log("tags => ", tags);
  return (
    <div className="card">
      <div className="d-flex">
        <div className="col-6 px-0">
          <img className="card-image" src={cover} />
        </div>
        <div className="col-6 px-0">
          <div className=" mt-2">
            <h5 className="fs-7 text-center">
              <b className="text-capitalize">{writer}</b>
            </h5>
            <p className="fs-7 mb-1 text-center text-capitalize">{title}</p>
            <p className="text-center fw-bold  mt-2">
              <span className="me-2 ">${price}</span>
              <span className="text-danger text-decoration-line-through">
                ${price}
              </span>
            </p>
            <div className="ps-1 opacity-75">
              {tag?.map((name, i) => (
                <span
                  key={i}
                  className="badge rounded-pill bg-warning text-dark me-1"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
