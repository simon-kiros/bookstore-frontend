import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCart, setTotalCart, userSelector } from "../../redux/userSlice";
import { useParams } from "react-router-dom";

function Cart() {
  const store = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [disableOrder, setDisableOrder] = useState(false);
  const { userId } = useParams();

  const updateOrderButton = (totalCart) => {
    if (totalCart > store.wallet) setDisableOrder(true);
    else setDisableOrder(false);
  };

  const handleRemoveCart = (bookId) => {
    dispatch(setCart(store.cart.filter((c) => c.id !== bookId)));
  };

  const getTotalCartPrice = () => {
    try {
      return store.cart.map((c) => c.price).reduce((prev, next) => prev + next);
    } catch (e) {
      return 0;
    }
  };

  const handleCreateOrder = async () => {
    try {
      const order = {
        book_quantity: store.cart.length,
        price: getTotalCartPrice(),
        user: userId,
      };
      console.log(order);
      await axios
        .post("http://localhost:8000/api/bookstore/orders", order)
        .then(function (res) {
          dispatch(setCart([]));
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="ms-4 mt-3 w-75">
        <h4>My Cart</h4>
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Book</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {store.cart.length ? (
              store.cart.map((cart, i) => (
                <tr key={cart.id}>
                  <th scope="row">{i + 1}</th>
                  <td className="text-capitalize">{cart.title}</td>
                  <td>${cart.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveCart(cart.id)}
                    >
                      remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
          <tfoot>
            <tr
              className="order-row"
              style={{ backgroundColor: "rgb(236 236 236) !important" }}
            >
              <td scope="row"></td>
              <td>Total Price</td>
              <td>{store.cart.length ? getTotalCartPrice() : 0}</td>
              <td>
                {store.cart.length ? (
                  <button
                    type="button"
                    onClick={handleCreateOrder}
                    className="btn btn-warning btn-sm me-2"
                    disabled={disableOrder}
                  >
                    Order
                  </button>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Layout>
  );
}

export default Cart;
