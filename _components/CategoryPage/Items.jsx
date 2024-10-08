"use client";
import React from "react";
import Card from "../Card";

function Items({ products }) {
  const [products1, setProducts] = React.useState(null);
  React.useEffect(() => {
    setProducts(products);
  }, [products]);
  return (
    <div className="Items">
      <div className="flex flex-wrap items-center justify-center gap-4  m-0">
        {products1
          ? products1.map((item, index) => (
              <Card
                key={index}
                img={`/images/${item.images[0].img}`}
                name={item.name}
                price={item.price}
                link={`/${item.category.url}/${item.category.url2}/${item._id}`}
              />
            ))
          : [...Array(10)].map((_, index) => {
              <Card
                key={index}
                img={undefined}
                name={undefined}
                price={undefined}
                link={undefined}
              />;
            })}
      </div>
    </div>
  );
}
export default Items;
