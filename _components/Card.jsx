import React from "react";
function Card(props) {
  return (
    <div className="Card h-full w-full max-w-full rounded overflow-hidden shadow-lg ">
      <a href={props.link ? props.link : "#"}>
        {props.img ? (
          <img
            className="w-full"
            src={`${props.img}`}
            alt="imgs/noimage.jpg"
          />
        ) : (
          <div className="px-1 relative pt-[100%] w-full rounded-xl bg-zinc-400 animate-pulse" />
        )}
        <div className="px-1 py-2">
          {props.name ? (
            <h1 className="Card-name ">{props.name}</h1>
          ) : (
            <div className="Card-name  relative pt-[10%] w-full mt-1 rounded-xl !min-h-4  bg-zinc-400 animate-pulse" />
          )}
          {props.price ? (
            <h1 className="Card-prise  mt-1">{props.price}₾</h1>
          ) : (
            <div className="Card-name  relative pt-[10%] w-[50%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
          )}
        </div>
      </a>
    </div>
  );
}
export default Card;
