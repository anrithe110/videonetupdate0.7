"use client"
import React, { useState, useEffect } from "react";
import { SearchButton, SearchInput, SearchResults } from "./Search/Search";
import Mobilemenu, { TogleButton } from "./Menu/Mobilemenu";
import Lang from "./Lang";
import { useTranslations } from "next-intl";
import Link from "next/link";
import AuthenticationPanel from "./auth/AuthenticationPanel";
import { useSession } from "next-auth/react";
import User from "./auth/User";
import url from "@/libs/url.config";
export default function NavTer(props) {
  const [ShowSearchResults, setShowSearchResults] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const currentYear = new Date().getFullYear();
  const R = useTranslations("Signin_Register");
  const S = useTranslations("search");
  const F = useTranslations("footer");
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  };
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth <= 970) {
        setShowMobileMenu(false)
    };
  }
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);
  useEffect(() => {
    const getProducts = async (query) => {
      if (query.length >= 2) {
        try {
          const res = await fetch(`${url}/api/findProduct`, {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          });

          if (!res.ok) {
            throw new Error("Failed to fetch products");
          }

          const data = await res.json();
          setProducts(data.findProduct);
        } catch (error) {
          console.log("Error loading products: ", error);
        }
      }
      if (query == "" || undefined) {
        setProducts(null);
        setQuery("");
      }
    };

    getProducts(query);
  }, [query]);

  function LoginBTN({ className, onClick, svgClass }) {
    return (
      <button
        className={`btn items-center ${className && className}`}
        onClick={() => onClick()}
      >
        <svg
          className={`main-svg ${svgClass && svgClass}`}
          viewBox="1 1 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="svg" cx="12" cy="9" r="3" strokeWidth="1.5" />
          <circle className="svg" cx="12" cy="12" r="10" strokeWidth="1.5" />
          <path
            className="svg"
            d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    );
  }
  return (
    <>
      <div className={`navbar fixed items-center w-full h-fit`}>
        <div className="main w-full m-[0px,auto] max-w-6xl ">
          <div className="flex w-full justify-between items-center gap-4">
            <TogleButton
              showMobileMenu={showMobileMenu}
              setShowMobileMenu={setShowMobileMenu}
            />
            <Link href="/">
              <img className="brand" src="/brands/logo.png" />
            </Link>
            <div className="sinput w-1/2">
              <SearchInput
                placeholder={S("search")}
                results={S("results")}
                ShowSearchResults={ShowSearchResults}
                setShowSearchResults={setShowSearchResults}
                handleInputChange={handleInputChange}
              />
            </div>
            <div className="flex justify-around items-center gap-2">
              <SearchButton
                ShowSearchResults={ShowSearchResults}
                setShowSearchResults={setShowSearchResults}
              />
              <LoginBTN
                className={"sinput"}
                onClick={() => setShowSignin(true)}
              />
              <Link href="/cart">
                <button className="btn items-center">
                  <svg
                    className="main-svg dark:fill-white fill-black"
                    viewBox="2 2 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M2.24896 2.29245C1.8582 2.15506 1.43005 2.36047 1.29266 2.75123C1.15527 3.142 1.36068 3.57015 1.75145 3.70754L2.01266 3.79937C2.68026 4.03409 3.11902 4.18964 3.44186 4.34805C3.74509 4.49683 3.87876 4.61726 3.96682 4.74612C4.05708 4.87821 4.12678 5.05963 4.16611 5.42298C4.20726 5.80319 4.20828 6.2984 4.20828 7.03835V9.75999C4.20828 11.2125 4.22191 12.2599 4.35897 13.0601C4.50529 13.9144 4.79742 14.526 5.34366 15.1022C5.93752 15.7285 6.69032 16.0012 7.58656 16.1283C8.44479 16.25 9.53464 16.25 10.8804 16.25L16.2861 16.25C17.0278 16.25 17.6518 16.25 18.1568 16.1882C18.6925 16.1227 19.1811 15.9793 19.6076 15.6318C20.0341 15.2842 20.2731 14.8346 20.4455 14.3232C20.6079 13.841 20.7339 13.2299 20.8836 12.5035L21.3925 10.0341L21.3935 10.0295L21.4039 9.97726C21.5686 9.15237 21.7071 8.45848 21.7416 7.90037C21.7777 7.31417 21.711 6.73616 21.3292 6.23977C21.0942 5.93435 20.7639 5.76144 20.4634 5.65586C20.1569 5.54817 19.8103 5.48587 19.4606 5.44677C18.7735 5.36997 17.9389 5.36998 17.1203 5.36999L5.66809 5.36999C5.6648 5.33324 5.66124 5.29709 5.6574 5.26156C5.60367 4.76518 5.48725 4.31246 5.20527 3.89982C4.92109 3.48396 4.54324 3.21762 4.10261 3.00142C3.69052 2.79922 3.16689 2.61514 2.55036 2.39841L2.24896 2.29245ZM5.70828 6.86999H17.089C17.9454 6.86999 18.6991 6.87099 19.2939 6.93748C19.5895 6.97052 19.8107 7.01642 19.9661 7.07104C20.0931 7.11568 20.1361 7.15213 20.1423 7.1574C20.1422 7.15729 20.1426 7.15762 20.1423 7.1574C20.2037 7.23881 20.2704 7.38651 20.2444 7.80796C20.217 8.25153 20.1005 8.84379 19.9229 9.73372L19.9225 9.73594L19.4237 12.1561C19.2623 12.9389 19.1537 13.4593 19.024 13.8441C18.9009 14.2095 18.7853 14.3669 18.66 14.469C18.5348 14.571 18.3573 14.6525 17.9746 14.6993C17.5714 14.7487 17.0399 14.75 16.2406 14.75H10.9377C9.5209 14.75 8.53783 14.7482 7.79716 14.6432C7.08235 14.5418 6.70473 14.3576 6.43219 14.0701C6.11202 13.7325 5.93933 13.4018 5.83744 12.8069C5.72628 12.1578 5.70828 11.249 5.70828 9.75999L5.70828 6.86999Z"
                    />
                    <path
                      clipRule="evenodd"
                      d="M7.5002 21.75C6.25756 21.75 5.2502 20.7426 5.2502 19.5C5.2502 18.2573 6.25756 17.25 7.5002 17.25C8.74285 17.25 9.7502 18.2573 9.7502 19.5C9.7502 20.7426 8.74285 21.75 7.5002 21.75ZM6.7502 19.5C6.7502 19.9142 7.08599 20.25 7.5002 20.25C7.91442 20.25 8.2502 19.9142 8.2502 19.5C8.2502 19.0858 7.91442 18.75 7.5002 18.75C7.08599 18.75 6.7502 19.0858 6.7502 19.5Z"
                    />
                    <path
                      clipRule="evenodd"
                      d="M16.5002 21.7501C15.2576 21.7501 14.2502 20.7427 14.2502 19.5001C14.2502 18.2574 15.2576 17.2501 16.5002 17.2501C17.7428 17.2501 18.7502 18.2574 18.7502 19.5001C18.7502 20.7427 17.7428 21.7501 16.5002 21.7501ZM15.7502 19.5001C15.7502 19.9143 16.086 20.2501 16.5002 20.2501C16.9144 20.2501 17.2502 19.9143 17.2502 19.5001C17.2502 19.0859 16.9144 18.7501 16.5002 18.7501C16.086 18.7501 15.7502 19.0859 15.7502 19.5001Z"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SearchResults
        placeholder={S("search")}
        noData={S("noData")}
        noQuery={S("noQuery")}
        results={S("results")}
        ShowSearchResults={ShowSearchResults}
        setShowSearchResults={setShowSearchResults}
        handleInputChange={handleInputChange}
        products={products}
        setQuery={setQuery}
        query={query}
      />
      <Mobilemenu
        showMobileMenu={showMobileMenu}
        login={
          <LoginBTN
            svgClass={"!w-8"}
            onClick={() => {
              setShowSignin(true);
              setShowMobileMenu(false);
            }}
          />
        }
      />
      {showSignin ? (
        session ? (
          <User
            onClick={() => setShowSignin(false)}
            session={session}
            hello={R("hello")}
            SignOut={R("SignOut")}
            Profile={R("Profile")}
            admin={R("admin")}
          />
        ) : (
          <AuthenticationPanel
            code={R("code")}
            placeholder_P={R("password")}
            placeholder_E={R("Email")}
            placeholder_lastName={R("lastName")}
            placeholder_name={R("name")}
            Signin={R("Signin")}
            register={R("register")}
            onClick={() => setShowSignin(false)}
          />
        )
      ) : null}
      <div className="pt-[60px]">{props.children}</div>
      <div
        className={`footer items-center top-auto w-full h-fit ${props.classNameBottom}`}
      >
        <div className="main w-full m-[0px,auto] max-w-6xl ">
          <hr className="m-3" />
          <div className="flex relative w-full justify-between items-center gap-4">
            <div className="w-full flex items-center justify-between p-[10px,0]">
              <div className="flex flex-col gap-3">
                <h1>{F("Navigation")}</h1>
                <hr />
                <div>about us</div>
                <a>servises</a>
                <a>contracts</a>
              </div>
              <div className="flex flex-col gap-3">
                <h1>{F("Follow")}</h1>
                <hr />
                <div>youtube</div>
                <a>facebook</a>
                <a>instagram</a>
              </div>
              <div className="flex flex-col gap-3">
                <h1>{F("Contact")}</h1>
                <hr />
                <div>Tel: 599 ## ## 85</div>
                <a>info@####.ge</a>
                <a>Branches</a>
              </div>
            </div>
          </div>
          <hr className="m-3" />
          <div className="flex justify-between">
            <p className="m-1" style={{ fontSize: "14" }}>
              {`Copyright © ${currentYear} ${F("Copyright")}`}
            </p>
            <Lang />
          </div>
        </div>
      </div>
    </>
  );
}
