import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCart, setTotalCart, userSelector } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserType from "../type/UserType";

function Navbar() {
  const store = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [toggleNav, setToggleNav] = useState("hide");
  const { userId } = useParams();
  const [user, setUser] = useState<UserType>({ fullName: "", wallet: 0 });

  async function getWallet(userId: string) {
    try {
      const res = await axios
        .get("http://localhost:8000/api/bookstore/auth/user/" + userId)
        .then(function (res) {
          const { fullName, wallet }: UserType = res.data;
          setUser({ fullName, wallet });
          // if (store.cart.find((c) => c.id === res.data.id)) setButton("remove");
          // else setButton("add");
        })
        .catch(function (error) {
          console.log(error);
          setUser({ fullName: "", wallet: 0 });
        });
      return res;
    } catch (error) {
      console.error(error);
      //return res.status(error.status || 500).end(error.message);
    }
  }

  const handleToggle = () => {
    setToggleNav(toggleNav === "show" ? "hide" : "show");
  };

  useEffect(() => {
    if (userId) getWallet(userId);
  }, [userId]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand ms-2" href="#">
            BOOKSTORE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse ms-5"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    store.page === "books" ? "active" : ""
                  }`}
                  aria-current="page"
                  to={`/bookstore/${userId}/books`}
                >
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    store.page === "cart" ? "active" : ""
                  }`}
                  aria-current="page"
                  to={`/bookstore/${userId}/carts`}
                >
                  Cart
                  {store.cart.length ? (
                    <span className="badge ms-2 rounded-pill bg-warning text-dark">
                      {store.cart
                        ?.map((c) => c.price)
                        .reduce((prev, next) => prev + next)}
                    </span>
                  ) : (
                    ""
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    store.page === "orders" ? "active" : ""
                  }`}
                  aria-current="page"
                  to={`/bookstore/${userId}/orders`}
                >
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    store.page === "profile" ? "active" : ""
                  }`}
                  aria-current="page"
                  to={`/bookstore/${userId}/profile`}
                >
                  Profile
                </Link>
              </li>
            </ul>
            <ul className="border border-light d-flex list-unstyled text-white mb-0">
              <li
                className=" py-1 px-3"
                style={{ backgroundColor: "rgb(57, 72, 103)" }}
              >
                WALLET
              </li>
              <li className="py-1 px-3 bg-white text-dark">{user.wallet}</li>
            </ul>
            <ul className="navbar-nav mx-4 mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link" aria-current="page">
                  {user.fullName}
                </span>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-decoration-underline"
                  aria-current="page"
                  to="/login"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className={`nav collapse ${toggleNav}`}
        id="navbarToggleExternalContent"
      >
        <div className="bg-secondary p-3 w-100">
          <ul className="border list-unstyled w-100">
            <li>
              <Link
                className="border-bottom text-white nav-link"
                href={`/bookstore/${userId}/books`}
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                className="border-bottom text-white nav-link"
                to={`/bookstore/${userId}/carts`}
              >
                Cart
              </Link>
              <Link
                className="border-bottom text-white nav-link"
                to={`/bookstore/${userId}/orders`}
              >
                Orders
              </Link>
              <Link
                className="text-white nav-link"
                to={`/bookstore/${userId}/profile`}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
