import React from "react";
import Cookies from "js-cookie"; 
import { nanoid } from "nanoid"; 
import url from "@/libs/url.config";
function AddToCart({ price, cartButton, session, productId }) {
  const [quantity, setQuantity] = React.useState(1);

  const addToOrders = async () => {

    if (quantity < 1) {
      alert("Quantity cannot be less than 1");
      return;
    }

    const id = nanoid(20);

    if (session?.user) {
      try {
        const response = await fetch(`${url}/api/Users/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user._id,
            price,
            productId,
            quantity,
            id,
          }),
        });
        if (!response.ok) {
          console.error(
            "Failed to add to orders:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }else {
      const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];
      const newCartItem = { productId, quantity };
      Cookies.set("cart", JSON.stringify([...cart, newCartItem]), {
        expires: 100, 
      });
    }
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setQuantity(value);
    } else {
      setQuantity(0);
    }
  };
  return (
    <div className="buy itemspec w-full h-fit items-center">
      <div className="main flex justify-between w-full m-[0px,auto] items-center max-w-xl">
        {price ? (
          <h1>{price}₾</h1>
        ) : (
          <div className="relative pt-[30px] w-[100px]  rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
        )}
        <div className="flex gap-1">
          <input
            onChange={handleQuantityChange}
            type="number"
            className="inp2 text-center"
            name="quantity"
            value={quantity}
          />
          <button
            onClick={() => addToOrders()}
            disabled={quantity <= 0}
            className="btn2"
          >
            {cartButton}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
