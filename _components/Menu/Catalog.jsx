"use client";
import React, { useState, useEffect } from "react";
import SubCatalog from "./SubCatalog";
import Link from "next/link";
import url from "@/libs/url.config";
import { useLocale } from "next-intl";

export default function Catalog() {
  const [isSubCatalogVisible, setIsSubCatalogVisible] = useState(false);
  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState({});
  const localActive = useLocale();
  useEffect(() => {
    const findParentCategories = async () => {
      try {
        const response = await fetch(`${url}/api/ParentCategory`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data.parentCategories);
          console.log(data.parentCategories)
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

  const handleCatalogItemHover = (subCategories , category) => {
    setSubCategories({subCategories , category});
    setIsSubCatalogVisible(true);
  };

  const handleCatalogItemLeave = () => {
    setIsSubCatalogVisible(false);
  };

  return (
    <div onMouseLeave={handleCatalogItemLeave} className="flex pc-catalog">
      <div className="catalog">
        {categories ? (
          categories.map((category, index) => (
            <div key={index} className="catalog-item">
              <Link
                onMouseEnter={() => handleCatalogItemHover(category.categories, category.url)}
                href={`/${category.url}`}
                key={index}
              >
                {category.name[localActive]}
              </Link>
            </div>
          ))
        ) : (
          <>
            <div className="Card-name  relative m-1 mt-2 pt-[15px] w-[93%] rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[90%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[80%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[90%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[80%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[96%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[90%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[80%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1 pt-[15px] w-[92%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[90%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[80%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[90%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[80%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
            <div className="Card-name  relative m-1  pt-[15px] w-[94%] mt-2.5 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
          </>
        )}
      </div>
      {isSubCatalogVisible && (<>
       
        <SubCatalog data={subCategories} localActive={localActive} /></>
      )}
    </div>
  );
}
