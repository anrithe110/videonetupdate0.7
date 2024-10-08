"use client";
import FilterButtons from "@/_components/CategoryPage/FilterButtons";
import React, { useState, useEffect } from "react";
import Items from "@/_components/CategoryPage/Items";
import Linked from "@/_components/Linked";
import Filters from "@/_components/CategoryPage/Filters";
import NavTer from "@/_components/NavTer";
import url from "@/libs/url.config";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter, useParams, useSearchParams } from "next/navigation";


export default function CategoriesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { categories } = useParams();
  const t = useTranslations("category");
  const localActive = useLocale();
  const [category, setCategory] = useState(null);
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [products, setProducts] = useState([]);
  const [MinMax, setMinMax] = useState();

  const findStatByURL = (category, url) => {
    return category.find((i) => i.url === url);
  };

  useEffect(() => {
    const updateDisplayState = () => {
      const isWideScreen = window.innerWidth >= 970;
      setDisplay(isWideScreen);
      setDisplay2(isWideScreen);
    };

    updateDisplayState();
    window.addEventListener("resize", updateDisplayState);
    return () => {
      window.removeEventListener("resize", updateDisplayState);
    };
  }, []);

  const max = searchParams.get("max");
  const min = searchParams.get("min");
  const brandFilter = searchParams.get("brand") ? searchParams.get("brand").split(",") : null;

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryResponse = await fetch(`${url}/api/ParentCategory`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (categoryResponse.ok) {
          const data = await categoryResponse.json();
          const stats = findStatByURL(data.parentCategories, categories);
          setCategory(stats);
          if (stats) {
            const productResponse = await fetch(
              `${url}/api/Products/findByParentCategory?url=${stats.url}`,
              {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              }
            );

            if (productResponse.ok) {
              const productData = await productResponse.json();

              const filtered = productData.products.filter(
                (product) => (!min || product.price >= min) && (!max || product.price <= max)
              );
              setProducts(filtered);
              const prices =
                productData.products &&
                productData.products
                  .map((product) => product.price)
                  .filter((price) => price != null);
              if (prices && prices.length > 0) {
                const max = Math.max(...prices);
                const min = Math.min(...prices);
                setMinMax([min, max]);
              }
            } else {
              console.error("Failed to fetch products:", productResponse.statusText);
            }
          } else {  
            window.location.href = "/"
          }
        } else {
          console.error("Failed to fetch categories:", categoryResponse.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategoriesAndProducts();
  }, [categories, min, max]);

  const isFilterApplied = Array.from(searchParams.keys()).some(
    (key) => searchParams.get(key) !== null && key !== "min" && key !== "max" && key !== "brand"
  );

  const filteredProducts = products
    .filter((product) => {
      if (brandFilter) {
        return brandFilter.includes(product.brand);
      }
      return true;
    })
    .map((product) => {
      if (!isFilterApplied) {
        return product;
      }

      return matchedStats.length > 0 ? { ...product  } : null;
    })
    .filter((product) => product !== null);

  return (
    <NavTer classNameBottom="!pb-[55px]">
      <div className="w-full h-fit items-center">
        <div className="flex gap-1 main max-w-7xl items-center">
          <Linked link="/" name={category && category.name[localActive]} />
          <div className="flex w-full justify-end">
            <button
              onClick={() => setDisplay(true)}
              className="btn m-1 filtersbtn"
            >
              <svg
                className="main-svg dark:stroke-white stroke-black"
                viewBox="2 1 21 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="dark:stroke-white stroke-black"
                  d="M19 4V7M19 14V20M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14ZM12 10V16M12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16ZM12 4V7M5 11V20M7 6C7 7.10457 6.10457 8 5 8C3.89543 8 3 7.10457 3 6C3 4.89543 3.89543 4 5 4C6.10457 4 7 4.89543 7 6Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <h1 className="pl-2 items-center">{t("filters")}</h1>
            </button>
          </div>
        </div>
        <div className="filters_Items main max-w-7xl">
          {category && products && MinMax ? (
            <Filters
              className={
                display2
                  ? "filters"
                  : display
                  ? "filters_mobile"
                  : "filters_mobile_hidden"
              }
              filters={t("filters")}
              MinMax={MinMax}
              localActive={localActive}
              stats={category}
              brands={category.brands}
              pathname={categories}
              subCategories={category.categories}
              products={products}
              router={router}
              Buttons={<FilterButtons onClickcls={() => setDisplay(false)} />}
              minh1={t("min")}
              maxh1={t("max")}
            />
          ) : (
            <div className="filterPlaceholder pb-[50%] rounded-xl bg-slate-400 animate-pulse"></div>
          )}
          <Items products={filteredProducts} />
        </div>
      </div>
    </NavTer>
  );
}
