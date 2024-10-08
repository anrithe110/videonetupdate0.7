"use client";
import React, { useState, useEffect } from "react";
import Mobilesubmenu from "./Mobilesubmenu";
import url from "@/libs/url.config";
import { useLocale } from "next-intl";
export default function Mobilemenu({ showMobileMenu, login }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState();
  const [categoryUrl, SetUrl] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const localActive = useLocale();
  useEffect(() => {
    const findParentCategories = async () => {
      try {
        const response = await fetch(`${url}/api/ParentCategory`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data.parentCategories);
        } else {
          console.error(
            "Failed to fetch parent categories:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    findParentCategories();
  }, []);

  return showMobileMenu ? (
    <div
      className={`catalog2 transition-transform duration-500 ease-in-out ${
        showMobileMenu ? "animate-slideInLeft" : "animate-slideOutLeft"
      }`}
    >
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
      <div className="mobileCategoryesItems">
        {categories.map((category, index) => (
          <div key={index} className="catalog-item">
            <button
              onClick={() => {
                setSubCategories(category.categories),
                  setName(category.name),
                  SetUrl(category.url);
              }}
              key={index}
            >
              {category.name[localActive]}
            </button>
          </div>
        ))}
        <Mobilesubmenu
          name={name}
          subCategories={subCategories}
          localActive={localActive}
          categoryUrl={categoryUrl}
        />
      </div>
      <div className="bg !rounded-none fixed bottom-0 right-0 left-0 p-2">
        <div className="flex justify-center">{login}</div>
      </div>
    </div>
  ) : null;
}
export function TogleButton({ showMobileMenu, setShowMobileMenu }) {
  return (
    <button
      className="btn items-center sinput-min"
      onClick={() => setShowMobileMenu(!showMobileMenu)}
    >
      {showMobileMenu ? (
        <svg
          className="main-svg dark:fill-white fill-black"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="dark:fill-white fill-black"
            d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
            fill="#0F0F0F"
          />
        </svg>
      ) : (
        <svg
          className="main-svg"
          viewBox="2 2 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 7L7 7M20 7L11 7"
            className="svg"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M20 17H17M4 17L13 17"
            className="svg"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M4 12H7L20 12"
            className="svg"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
