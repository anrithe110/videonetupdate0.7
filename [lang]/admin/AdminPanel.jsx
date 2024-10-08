"use client";
import React, { useState, useEffect } from "react";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import AddBrandsComponent from "./components/AddBrands";
import AddSubCategory from "./components/AddSubCategory";
import AddParentCategory from "./components/addParentCategory";
import AddBanner from "./components/AddBanner";
import AllParentCategories from "./components/AllParentCategories";
import AllBrands from "./components/AllBrands";
import AllBanners from "./components/AllBanners";
import AllSubCategories from "./components/AllSubCategories";
import Users from "./components/Users";
import Navbar from "./components/mini/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [Component, setComponent] = useState();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const router = useRouter();

  function changeTab(tabName) {
    setIsOpen(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabName);
    router.push(`admin?${params.toString()}`, { scroll: false });

    switch (tabName) {
      case "Products":
        setComponent(<Products />);
        break;
      case "AddProduct":
        setComponent(<AddProduct />);
        break;
      case "AddParentCategory":
        setComponent(<AddParentCategory />);
        break;
      case "EditParentCategories":
        setComponent(<AllParentCategories />);
        break;
      case "EditSubCategories":
        setComponent(<AllSubCategories />);
        break;
      case "AddSubCategory":
        setComponent(<AddSubCategory />);
        break;
      case "AddBrands":
        setComponent(<AddBrandsComponent />);
        break;
      case "AllBrands":
        setComponent(<AllBrands />);
        break;
      case "AddBanner":
        setComponent(<AddBanner />);
        break;
      case "AllBanners":
        setComponent(<AllBanners />);
        break;
      case "UserPrivileges":
        setComponent(<Users />);
        break;
      default:
        setComponent(
          <div className="flex flex-col mt-24 mb-24 align-middle items-center text-center">
            <img src="/404cam.png" className="w-[300px] p-10" />
            <h1 className="p-14 text-2xl">somthing went Wrong, select a valid Tab</h1>
          </div>
        );
    }
  }

  const Menu = React.memo(() => (
    <div className="w-full">
      <details className="p-2">
        <summary className="cursor-pointer">products</summary>
        <div className="summaryOptions">
          {[
            { component: "Products", label: "Products" },
            { component: "AddProduct", label: "Add Product" },
          ].map((menu, index) => (
            <ul
              key={index}
              className="m-3 cursor-pointer"
              onClick={() => changeTab(menu.component)}
            >
              <button className="cursor-pointer">{menu.label}</button>
            </ul>
          ))}
        </div>
      </details>
      <details className="p-2">
        <summary className="cursor-pointer">Categories</summary>
        <div className="summaryOptions">
          {[
            { component: "AddParentCategory", label: "Add Parent Category" },
            { component: "AddSubCategory", label: "Add Sub Category" },
            {
              component: "EditParentCategories",
              label: "Edit Parent Categories",
            },
            { component: "EditSubCategories", label: "Edit Sub Categories" },
          ].map((menu, index) => (
            <ul
              key={index}
              className="m-3 cursor-pointer"
              onClick={() => changeTab(menu.component)}
            >
              <button className="cursor-pointer">{menu.label}</button>
            </ul>
          ))}
        </div>
      </details>
      <details className="p-2">
        <summary className="cursor-pointer">Banner</summary>
        <div className="summaryOptions">
          {[
            { component: "AddBanner", label: "Add Banner" },
            { component: "AllBanners", label: "All Banners" },
          ].map((menu, index) => (
            <ul
              key={index}
              className="m-3 cursor-pointer"
              onClick={() => changeTab(menu.component)}
            >
              <button className="cursor-pointer">{menu.label}</button>
            </ul>
          ))}
        </div>
      </details>
      <details className="p-2">
        <summary className="cursor-pointer">Brands</summary>
        <div className="summaryOptions">
          {[
            { component: "AddBrands", label: "Add Brands" },
            { component: "AllBrands", label: "All Brands" },
          ].map((menu, index) => (
            <ul
              key={index}
              className="m-3 cursor-pointer"
              onClick={() => changeTab(menu.component)}
            >
              <button className="cursor-pointer">{menu.label}</button>
            </ul>
          ))}
        </div>
      </details>
      <details className="p-2">
        <summary className="cursor-pointer">Manage Users</summary>
        <div className="summaryOptions">
          {[
            { component: "UserPrivileges", label: "User Privileges" },
            {
              component: "ManegeStaffDiscount",
              label: "Manege Staff Discount",
            },
          ].map((menu, index) => (
            <ul
              key={index}
              className="m-3 cursor-pointer"
              onClick={() => changeTab(menu.component)}
            >
              <button className="cursor-pointer">{menu.label}</button>
            </ul>
          ))}
        </div>
      </details>
      <details className="p-2">
        <summary className="cursor-pointer">Manage offers</summary>
        <div className="summaryOptions">
          {[
            { component: "Offers", label: "Offerss" },
            { component: "HomePageOffers", label: "HomePageOffers" },
          ].map((menu, index) => (
            <ul
              key={index}
              className="m-3 cursor-pointer"
              onClick={() => changeTab(menu.component)}
            >
              <button className="cursor-pointer">{menu.label}</button>
            </ul>
          ))}
        </div>
      </details>
      <details className="p-2">
        <summary className="cursor-pointer">Manage site info</summary>
        <div className="summaryOptions">
          {[
            { component: "CompanyLogo", label: "Company Logo" },
            { component: "Companyinfo", label: "Manage Company Info" },
          ].map((menu, index) => (
            <ul
              key={index}
              className="m-3 cursor-pointer"
              onClick={() => changeTab(menu.component)}
            >
              <button className="cursor-pointer">{menu.label}</button>
            </ul>
          ))}
        </div>
      </details>
    </div>
  ));
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsLargeScreen(width >= 970);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (tab) {
      changeTab(tab);
    } else {
      router.push(`admin`, { scroll: false });
    }
  }, [tab]);

  return (
    <>
      <div className="items-center min-h-[1000px] z-0 top-auto w-full h-fit relative">
        <Navbar />
        <div className="main z-0 w-full m-0 max-w-7xl">
          {isLargeScreen ? (
            <>
              <hr className="m-3" />
              <div className="profile !gap-5 min-h-[1000px] pt-2 w-full">
                <div
                  className="w-full"
                  style={{ borderRight: "2px solid #007bff" }}
                >
                  <Menu />
                </div>
                <div className="w-full adminContent">{Component}</div>
              </div>
            </>
          ) : (
            <>
              {!isOpen ? (
                <div className="pl-1 flex gap-2 items-center">
                  <h1 className="text-xl m-1">menu</h1>
                </div>
              ) : (
                <h1 className="text-xl p-1" onClick={() => setIsOpen(false)}>
                  close
                </h1>
              )}
              <hr className="m-3" />
              <div className="min-h-[1000px] pt-2 w-full relative">
                <div
                  className={`w-full transition-transform duration-300 ease-in-out ${
                    isOpen
                      ? "-translate-x-full opacity-0 pointer-events-none"
                      : "translate-x-0 opacity-100 pointer-events-auto"
                  }`}
                >
                  <Menu />
                </div>
                <div
                  className={`w-full adminContent transition-transform  duration-300 ease-in-out ${
                    isOpen
                      ? "translate-x-0 opacity-100 pointer-events-auto"
                      : "-translate-x-full opacity-0 pointer-events-none"
                  } absolute top-0 left-0 w-full `}
                >
                  <div className="mt-4">{Component}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
