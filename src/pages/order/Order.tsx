import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCart, setTotalCart, userSelector } from "../../redux/userSlice";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

function Order() {
  const store = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState(null);
  const { userId } = useParams();
  const url = "http://localhost:8000/api/bookstore/orders/";

  async function fetch(id) {
    axios.get(url + id).then((res) => {
      console.dir(res.data);
      setOrders(res.data);
    });
  }
  // async function fetch(url, method, data, fn) {
  //   console.log("fetch (from): ", url);
  //   await axios
  //     .get({ url })
  //     .then(function (res) {
  //       console.log("success");
  //       if (res.data === "") setOrders([]);
  //       else setOrders(res.data);
  //     })
  //     .then(function (res) {
  //       if (method === "delete") {
  //         setTimeout(async function () {
  //           axios.get(getOrdersurl).then(function (response) {
  //             console.dir("delete --- : ", getOrdersurl);
  //             console.dir(response.data);
  //             setOrders(response.data);
  //           });
  //         }, 100);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("isSuccess : false");
  //       return { error, isSuccess: false };
  //     });
  // }

  const handleRemoveOrder = (orderId: number) => {
    axios.get(url + "cancel/" + orderId).then((res) => {
      console.dir(res.data);
      //setOrders(res.data);
    });
    setTimeout(async () => {
      await fetch(userId);
    }, 100);
  };

  const handleReceiveOrder = (orderId: number) => {
    axios.get(url + "received/" + orderId).then((res) => {
      console.dir(res.data);
    });
    setTimeout(async () => {
      await fetch(userId);
    }, 100);
  };

  useEffect(() => {
    fetch(userId);
  }, [userId]);

  return (
    <Layout>
      <div className="ms-4 mt-3 w-75">
        <h4>Order History</h4>
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Book Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <ErrorBoundary fallback={<></>}>
              {orders?.map((order, i) => (
                <tr
                  key={order.id}
                  style={
                    order.status === "ORDERED"
                      ? { backgroundColor: "rgb(236 236 236) !important" }
                      : {}
                  }
                >
                  <td scope="row">{i + 1}</td>
                  <td className="text-capitalize">{order.book_quantity}</td>
                  <td>${order.price}</td>
                  <td>{order.created_at.split("T")[0]}</td>
                  <td>
                    <span
                      className={
                        order.status === "COMPLETED" ? "text-success" : ""
                      }
                    >
                      {order.status === "PENDING" ? "ORDERED" : ""}
                    </span>
                  </td>
                  <td>
                    {order.status === "PENDING" ? (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveOrder(order.id)}
                      >
                        cancel
                      </button>
                    ) : (
                      <></>
                    )}
                    {order.status === "PENDING" ? (
                      <button
                        type="button"
                        className="btn btn-success ms-2 btn-sm"
                        onClick={() => handleReceiveOrder(order.id)}
                      >
                        received
                      </button>
                    ) : (
                      <></>
                    )}
                    {order.status === "COMPLETED" ? (
                      <button
                        type="button"
                        className="btn btn-success ms-2 btn-sm disabled"
                        onClick={() => handleReceiveOrder(order.id)}
                      >
                        received
                      </button>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </ErrorBoundary>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Order;
