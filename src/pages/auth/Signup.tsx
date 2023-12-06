import React from "react";
import { FaBookOpen } from "react-icons/fa";
import axios from "axios";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      fullName: event.target.fullName.value,
      username: event.target.username.value,
      password: event.target.password.value,
    };
    const endpoint = "http://localhost:8000/api/bookstore/signup";
    await axios
      .post(endpoint, data)
      .then((res) => {
        console.log("success ", res);
        if (res.data.message === "success") {
          console.log(res.data.id);
          navigate("/bookstore/" + res.data.id + "/books");
        } else return 0;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-center">
        <div className="text-black border rounded">
          <div className="text-center mt-5">
            <span className="h2 fw-bold mb-0">
              <FaBookOpen style={{ marginRight: "15px" }} />
              XBookStore
            </span>
          </div>

          <div className="d-flex mt-5">
            <form onSubmit={handleSubmit}>
              <p className="opacity-50 text-center text-uppercase">
                Registration Info
              </p>
              <div
                className="px-4 py-2"
                style={{ backgroundColor: "#f1f1f1", width: "40rem" }}
              >
                <div className="">
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      name="username"
                      id="username"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 py-2">
                <div className="d-flex justify-content-between align-items-center pt-1 mb-2">
                  <label className="mb-0 text-muted">
                    <input type="checkbox" className="me-2" />I agree to the
                    <a href="#" className="mx-1">
                      terms
                    </a>
                    and
                    <a href="#" className="mx-1">
                      conditions.
                    </a>
                  </label>
                  <button className="btn btn-primary px-5" type="submit">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
