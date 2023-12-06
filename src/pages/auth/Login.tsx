import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    const endpoint = "http://localhost:8000/api/bookstore/login";
    await axios
      .post(endpoint, data)
      .then((res) => {
        console.log("success ", res);
        if (res.data.id) navigate("/bookstore/" + res.data.id + "/books");
        //router.push("/customer/" + res.data.id + "/books");
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
              BookStore
            </span>
          </div>

          <div className="d-flex mt-5">
            <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
              <div className="px-4 py-2" style={{ backgroundColor: "#f1f1f1" }}>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="username"
                    id="username"
                    className="form-control "
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
                    className="form-control "
                  />
                </div>

                <div className="d-flex justify-content-between pt-1 mb-2">
                  <button className="btn btn-primary px-5" type="submit">
                    Login
                  </button>

                  <a className="text-muted" href="#!">
                    Forgot password?
                  </a>
                </div>
              </div>

              <p className="p-4">
                Don't have an account?
                <a href="/signup" className="ms-2">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
