import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import BookType from "../../type/BookType";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCart, setTotalCart, userSelector } from "../../redux/userSlice";

function DetailBook() {
  const store = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const { bookId } = useParams();
  const [book, setBook] = useState<BookType | null>(null);
  const [button, setButton] = useState("add");

  async function getBook(bookId) {
    try {
      const res = await axios
        .get("http://localhost:8000/api/bookstore/books/" + bookId)
        .then(function (res) {
          setBook(res.data);
          // if (store.cart.find((c) => c.id === res.data.id)) setButton("remove");
          // else setButton("add");
        })
        .catch(function (error) {
          console.log(error);
        });
      return res;
    } catch (error) {
      console.error(error);
      //return res.status(error.status || 500).end(error.message);
    }
  }

  const handleClick = (event) => {
    event.preventDefault();
    const cart = {
      id: book.id,
      title: book.title,
      price: book.price,
    };
    if (button === "add") {
      dispatch(setCart([...store.cart, cart]));
      dispatch(setTotalCart(cart.price + store.totalCart));
      setButton("remove");
    } else {
      dispatch(setCart(store.cart.filter((c) => c.id !== cart.id)));
      dispatch(setTotalCart(store.totalCart - cart.price));
      setButton("add");
    }
  };

  useEffect(() => {
    getBook(bookId);
  }, [bookId]);

  if (!book) <h1>loading...</h1>;

  return (
    <Layout>
      <div className="book-detail d-flex mt-3 ms-3">
        <div>
          <img className="book-detail-image" src={book?.cover} />
        </div>

        <div className="ms-4">
          <h5>
            <b>{book?.writer}</b>
          </h5>
          <p className=" mb-0 text-capitalize">{book?.title}</p>
          <p className="text-muted mt-2 mb-2 fs-8 w-75 fst-italic">
            "{book?.description}"
          </p>
          <div className="ps-1 mb-2 opacity-75">
            {book?.tag.map((name, i) => (
              <span
                key={i}
                className="badge rounded-pill bg-warning text-dark me-1"
              >
                {name}
              </span>
            ))}
          </div>
          <div className="d-flex gap-3">
            <span className="mt-2 text-danger fw-bold">${book?.price} </span>
            <div className="d-grid gap-2 ">
              <button
                type="button"
                className={`btn ${
                  button === "add" ? "btn-warning" : "btn-danger"
                }`}
                onClick={handleClick}
              >
                {button === "add" ? "Add to Cart" : "Remove from Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DetailBook;
