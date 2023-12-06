import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import { useParams } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  async function getCustomer(customerId) {
    try {
      const res = await axios
        .get("http://localhost:4000/bookstore/customer/" + customerId)
        .then(function (res) {
          setCustomer(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      return res;
    } catch (error) {
      console.error(error);
      return res.status(error.status || 500).end(error.message);
    }
  }

  async function fetch(userId) {
    axios
      .get("http://localhost:8000/api/bookstore/auth/user/" + userId)
      .then((res) => {
        console.dir(res.data);
        setUser(res.data);
      });
  }

  useEffect(() => {
    fetch(userId);
  }, [userId]);

  if (!user) <h1>loading...</h1>;

  return (
    <Layout>
      <div className="row mt-3 ms-4 profile">
        <h5 className="mb-4">Customer Profile</h5>
        <div className="col-5" style={{ minWidth: "300px" }}>
          <div className="mb-2 profile-row">
            <label htmlFor="fullName" className="col-sm-2 col-form-label">
              Fullname
            </label>
            <div className="col-sm-10">
              <input
                value={user?.fullName}
                type="text"
                className="form-control fs-7"
                id="fullName"
                disabled
              />
            </div>
          </div>

          <div className="mb-2 profile-row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control fs-7"
                id="email"
                value={user?.username}
                disabled
              />
            </div>
          </div>
          <div className="mb-2 profile-row">
            <label htmlFor="price" className="col-sm-2 col-form-label">
              Wallet
            </label>
            <div className="col-sm-10">
              <input
                value={"$" + user?.wallet}
                type="text"
                className="form-control fs-7"
                id="price"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="col-5 d-flex justify-content-center">
          <BsPersonCircle size={150} className="opacity-75 avatar-icon" />
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
