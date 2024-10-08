"use client"
import { useState } from "react";
import EditButton from "./EditButton";
function Actions({ NameFunc , OptFunc , DeleteFunc}) {
    const [display3, setDisplay3] = useState(false);
    return (
      <div className="flex justify-center gap-2 items-center">
        <EditButton
          click={() => {
            setDisplay3(!display3);
          }}
        />

        <div className="w-0  flex items-center will-change-transform">
          {display3 && (
            <div className="optionpop !p-1 !w-[150px] !left-[-60px] !mt-4 font-extrabold">
              <h1
                className="p-1  cursor-pointer "
                onClick={() => {
                  NameFunc();
                  setDisplay3(false);
                }}
              >
                Edit Name
              </h1>
              <h1
                className="p-1 cursor-pointer  "
                onClick={() => {
                    OptFunc();
                  setDisplay3(false);
                }}
              >
                Edit Options
              </h1>
            </div>
          )}
        </div>
          <button onClick={DeleteFunc}>
            <svg
              className="main-svg dark:stroke-[red] stroke-[red]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
      </div>
    );
  }
  export default Actions