import React, { useEffect, useState } from "react";
import url from "@/libs/url.config";

export const Orders = ({ o, session }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]); // Store products here
  const [totalPrice, setTotalPrice] = useState(0);


  async function userOrders() {
    const res = await fetch(`${url}/api/Users/orders?id=${session.user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setOrders(data?.order?.orders);
  }


  async function fetchProducts() {
    const productIds = orders.map((order) => order.productId); 
    const res = await fetch(
      `${url}/api/Products?ids=${productIds.join(",")}&stats=${false}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setProducts(data.products); // Assume API returns product array
    console.log(data.products);
  }

  useEffect(() => {
    if (orders.length > 0) {
      fetchProducts();
    }
  }, [orders]);

  useEffect(() => {
    userOrders();
  }, [session.user._id]);

  useEffect(() => {
    if (orders?.length > 0 && products?.length > 0) {
      const total = orders?.reduce((acc, order) => {
        const product = products?.find((p) => p.id === order?.productId);
        return product ? acc + product?.price * order?.Quantity : acc;
      }, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [orders, products]);

  useEffect(() => {
    if (orders?.length > 0 && products?.length > 0) {
      const total = orders.reduce((acc, order) => {
        const product = products.find(
          (p) => String(p._id) === String(order.productId)
        );
        if (product) {
          return acc + product.price * order.Quantity;
        }
        return acc;
      }, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0); // Reset to 0 when no orders or products
    }
  }, [orders, products]);

  async function RemoveOrder(order_id, user_id, deleteAll) {
    if (confirm("Remove this order?")) {
      try {
        const res = await fetch(`${url}/api/Users/orders`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            order_id: order_id,
            deleteAll: deleteAll,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to delete order");
        } else {
          userOrders();
        }
      } catch (error) {
        console.log("Error removing order: ", error);
      }
    }
  }

  function Item({ order_id, Quantity, productId }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(Quantity);

    async function updateQuantity(newQuantity) {
      try {
        const res = await fetch(`${url}/api/Users/orders`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: session.user._id,
            order_id: order_id,
            newQuantity: newQuantity,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to update order quantity");
        } else {
          userOrders();
        }
      } catch (error) {
        console.log("Error updating quantity: ", error);
      }
    }

    const handleIncrease = () => {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(newQuantity);
    };

    const handleDecrease = () => {
      const newQuantity = Math.max(1, quantity - 1);
      setQuantity(newQuantity);
      if (newQuantity >= 1) {
        updateQuantity(newQuantity);
      }
    };

    async function findProduct() {
      try {
        const res = await fetch(
          `${url}/api/Products?id=${productId}&stats=false`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        console.log("Error loading product: ", error);
        setLoading(false);
      }
    }

    useEffect(() => {
      if (productId) {
        findProduct();
      }
    }, [productId]);

    if (loading) {
      return (
        <div className="px-1 relative min-w-[80px] max-w-[80px] w-[14%] rounded-xl bg-zinc-400 animate-pulse" />
      );
    }

    return (
      <div className="search_results_body">
        {product?.images?.[0] ? (
          <a>
            <img
              className="search_results_img !max-w-[75px]"
              src={`/images/${product.images[0].img}`}
              alt="Product image"
            />
          </a>
        ) : (
          <div className="px-1 relative min-w-[80px] max-w-[80px] w-[14%] rounded-xl bg-zinc-400 animate-pulse" />
        )}
        <div className="flex w-full justify-between">
          <div className="search_results_content">
            <a href={"/"}>
              <h1>{product?.name}</h1>
            </a>
            <h2>{product?.price} ₾</h2>
          </div>
          <div className="sm:flex-row flex flex-col-reverse gap-2 p-2 sm:gap-5 sm:items-center items-end">
            <div className="Quantity">
              <button className="border-r pl-2 pr-3" onClick={handleDecrease}>
                <h1 className="text-lg">-</h1>
              </button>
              <h2 className="pr-2 pl-2 text-lg">{quantity}</h2>
              <button className="border-l pr-2 pl-3" onClick={handleIncrease}>
                <h1 className="text-lg">+</h1>
              </button>
            </div>
            <div className="flex justify-evenly items-end">
              <button
                onClick={() => {
                  RemoveOrder(order_id, session.user._id, false);
                }}
              >
                <svg
                  className="main-svg dark:stroke-[red] stroke-[red]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7H8Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-between pb-4">
        <div>
          <h1>{o("orders")}</h1>
        </div>
        {orders?.length > 0 && (
          <button
            onClick={() => {
              RemoveOrder(null, session.user._id, true);
            }}
            className="btn gap-2"
          >
            <svg
              className="main-svg w-3 dark:stroke-[#ff8484] stroke-[#ff8484]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7H8Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h1 className="text-[#ff8484]">{o("deleteAll")}</h1>
          </button>
        )}
      </div>

      {orders?.length > 0 ? (
        <div className="productPage h-full">
          <div className="page-1">
            <div className="flex flex-col w-full overflow-auto min-h-[100px] !max-h-[600px]">
              {orders?.map((order, index) => (
                <Item
                  key={index}
                  productId={order.productId}
                  order_id={order.id}
                  Quantity={order.Quantity}
                />
              ))}
            </div>
          </div>

          <div className="page-2">
            <div className="PriseModel !sticky w-fit flex text-lg flex-col items-center gap-2 h-fit">
              <div className="buy itemspec left-0 right-0 w-fit h-fit items-center">
                <div className="flex main justify-between w-full m-[0px,auto] max-w-xl">
                  <h1 className="!text-xl">{o("totalPrice")}</h1>
                  <h1 className="!text-xl">{totalPrice}₾</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-24 mb-24 align-middle items-center text-center">
          <img src="/404cam.png" className="w-[300px] p-10" />
          <h1 className="p-14 text-2xl">{o("noOrders")}</h1>
        </div>
      )}
    </>
  );
};
