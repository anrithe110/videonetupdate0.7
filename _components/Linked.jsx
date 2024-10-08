"use client";
import React from "react";

function Linked(props) {
  return (
    <div className="linked whitespace-nowrap flex">
      {props.name ? (
         <>
          <svg
            className="main-svg dark:fill-white fill-black"
            viewBox="2 1 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" />
          </svg>
          <a href={props.link} className="flex items-center">
            <h1>{props.name}</h1>
          </a>
        </>
      ) : (
       <div className=" pt-[25px] sm:w-[30%]  w-[50%]  rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
      )}
    </div>
  );
}
export default Linked;
