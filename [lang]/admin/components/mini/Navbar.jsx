"use client";
import React, { useState , useEffect, Children } from "react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
function Navbar({Children}) {
  const [options, setOptions] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session === "error") {
      console.error("Error fetching session");
    }
    if (!session) {
      console.log("loading");
    }
    if (session !== undefined || null) {
      if (session && session.user.role != "admin") {
        redirect("/");
      }
    } 
  }, [session]);



  function Options() {
    return (
      <div className="optionpop font-extrabold  z-50">
        <a className="p-1 cursor-pointer" href="/profile">profile</a>
        <h1 className="p-1 cursor-pointer text-red-400 " onClick={() => confirm('sign Out ?') == true && signOut()}>
          logout
        </h1>
      </div>
    );
  }
  return (<>
    <div className="navbar  items-center top-auto w-full h-fit">
      <div className="main  w-full m-[0px,auto] max-w-6xl ">
        <div className="flex relative  w-full justify-between items-center gap-10">
          <div>
            <a href="/admin" className="text-2xl">
              ADMIN Panel
            </a>
          </div>
          <div className="w-fit flex items-center will-change-transform">
            <div
              className="pl-1 flex gap-2 btn"
              onClick={() => setOptions(!options)}
            >
              <svg
                className="main-svg !w-[25px]"
                viewBox="1 1 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="svg"
                  cx="12"
                  cy="9"
                  r="3"
                  strokeWidth="1.5"
                />
                <circle
                  className="svg"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="1.5"
                />
                <path
                  className="svg"
                  d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <h1 className="">
                {session &&
                  session.user &&
                  session.user.name &&
                  session.user.name}
              </h1>
            </div>
            {options && <Options />}
          </div>
        </div>
      </div>
    </div>
</>
  );
}

export default Navbar;
