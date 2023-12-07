import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constitants/Constitant";

function Login() {
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);
  const ref = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    const endpoint = BACKEND_URL + "auth/login";
    await axios
      .post(endpoint, data)
      .then((res) => {
        ///console.log("success ", res);
        if (res.data.id) navigate("/bookstore/" + res.data.id + "/books");
      })
      .catch(function (error) {
        setFlash(true);
        ref.current.value = "";
        console.log(error);
      });
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-center">
        <div className="text-black border rounded">
          <div className="text-center mt-5">
            <span className="h2 fw-bold mb-0 ">BookStore</span>
          </div>
          <div className="mt-4 text-center">
            <span
              className={`small text-danger ${flash ? "d-block" : "d-none"}`}
            >
              username or password incorrect
            </span>
          </div>
          <div className="d-flex mt-2">
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
                    className="form-control"
                    ref={ref}
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
