"use client";
import React, { useEffect, useState } from "react";
import NavTer from "@/_components/NavTer";
import Linked from "@/_components/Linked";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import url from "@/libs/url.config";

export default function Cart() {
  const t = useTranslations("cart");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); // Stores fetched product details
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart items from cookies
  useEffect(() => {
    const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];
    setCartItems(cart);
  }, []);

  // Fetch product details for cart items
  useEffect(() => {
    async function fetchProducts() {
      const productIds = cartItems.map((order) => order.productId);
      if (productIds.length > 0) {
        try {
          const res = await fetch(
            `${url}/api/Products?ids=${productIds.join(",")}&stats=false`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          setProducts(data.products); // Assume API returns product array
          console.log("Fetched Products: ", data.products);
        } catch (error) {
          console.log("Error fetching products: ", error);
        }
      }
    }

    if (cartItems.length > 0) {
      fetchProducts();
    }
  }, [cartItems]);

  // Calculate total price whenever cartItems or products change
  useEffect(() => {
    if (cartItems.length > 0 && products.length > 0) {
      const productMap = products.reduce((acc, product) => {
        acc[product._id] = product;
        return acc;
      }, {});

      const total = cartItems.reduce((acc, order) => {
        const product = productMap[order.productId];
        if (product) {
          return acc + product.price * order.quantity;
        }
        return acc;
      }, 0);

      setTotalPrice(total);
    } else {
      setTotalPrice(0); // Reset total price when no items
    }
  }, [cartItems, products]);

  // Remove item from cart
  const removeItemFromCart = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart));
  };

  // Update item quantity in cart
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: Math.max(newQuantity, 1) };
        }
        return item;
      });
      Cookies.set("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Render a product card for each item in the cart
  function Pcard({ productId, quantity }) {
    const product = products.find((p) => String(p._id) === String(productId));

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
              <button
                className="border-r pl-2 pr-3"
                onClick={() => updateQuantity(productId, quantity - 1)}
              >
                <h1 className="text-lg">-</h1>
              </button>
              <h2 className="pr-2 pl-2 text-lg">{quantity}</h2>
              <button
                className="border-l pr-2 pl-3"
                onClick={() => updateQuantity(productId, quantity + 1)}
              >
                <h1 className="text-lg">+</h1>
              </button>
            </div>
            <div className="flex justify-evenly items-end">
              {/* Button to remove the item */}
              <button onClick={() => removeItemFromCart(productId)}>
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
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavTer classNameBottom="!pb-[100px]">
      <div className="items-center top-auto w-full">
        <div className="main w-full m-[0px,auto] max-w-4xl">
          <div className="flex pb-2 justify-between">
            <Linked name="cart" link="/" />
            {cartItems.length > 0 && (
              <button
                className="btn m-1"
                onClick={() => {
                  Cookies.remove("cart");
                  setCartItems([]);
                  setTotalPrice(0);
                }}
                disabled={cartItems.length === 0}
              >
                <svg
                  className="main-svg w-3 dark:stroke-[white] stroke-[black]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7H8Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <h1 className="pl-2">{t("clear")}</h1>
              </button>
            )}
          </div>
          <hr />
          {cartItems.length > 0 ? (
            <>
              <h1 style={{ paddingTop: "4px" }} className="pt-5">
                {t("sumitems", { count: cartItems.length })}
              </h1>
              <div className="cartItems pt-4">
                <div>
                  {cartItems.map((item, index) => (
                    <Pcard
                      key={index}
                      productId={item.productId}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
                <div>
                  <div className="pay">
                    <div className="flex justify-between">
                      <h1>{t("fullprice")}</h1>
                      <h1>{totalPrice}₾</h1>
                    </div>
                    <div className="pt-2">
                      <button className="btn2">
                        <h1>{t("pay")}</h1>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col mt-24 mb-24 align-middle items-center text-center">
              <img src="/404cam.png" className="w-[300px] p-10" />
              <h1 className="p-14 text-2xl">
                {t("sumitems", { count: cartItems.length })}
              </h1>
            </div>
          )}
        </div>
      </div>
    </NavTer>
  );
}
