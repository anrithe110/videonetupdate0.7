"use client";
import url from "@/libs/url.config";
import NavTer from "@/_components/NavTer";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EditProfile } from "@/_components/ProfileComponents/EditProfile";
import { Orders } from "@/_components/ProfileComponents/Orders";
import { Password } from "@/_components/ProfileComponents/Password";
import { signOut } from "next-auth/react";

const ProfilePage = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [Component, setComponent] = useState(null);
  const t = useTranslations("profile");
  const p = useTranslations("password");
  const e = useTranslations("editProfile");
  const o = useTranslations("orders");

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const router = useRouter();

  function changeTab(tabName) {
    if (tabName !== undefined || null) {
      setIsOpen(true);
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tabName);
      router.replace(`profile?${params.toString()}`, { scroll: false });
      switch (tabName) {
        case "EditProfile":
          setComponent(<EditProfile e={e} user={userInfo} session={session} />);
          break;
        case "Orders":
          setComponent(<Orders o={o} session={session} />);
          break;
        case "Password":
          setComponent(<Password p={p} session={session} />);
          break;
        default:
          setComponent(<EditProfile e={e} user={userInfo} session={session} />);
      }
    }
  }

  useEffect(() => {
    let isMounted = true;
    if (tab !== undefined || null) {
     tab && changeTab(tab);
    }
    if (!userInfo && isMounted) {
      async function findUser() {
        try {
          const res = await fetch(`${url}/api/Users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ find: session.user.email }),
          });

          if (!res.ok) {
            throw new Error("Failed to fetch users");
          }

          const data = await res.json();
          if (isMounted) setUserInfo(data.user[0]);
        } catch (error) {
          console.error("Error loading users: ", error);
        }
      }
      findUser();
    }

    return () => {
      isMounted = false;
    };
  }, [session.user.email, tab, userInfo]);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 970);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Menu = React.memo(() => (
    <div className="flex flex-col gap-4">
      <h2
        onClick={() => {
          changeTab("EditProfile");
        }}
        className="text-lg cursor-pointer"
      >
        {t("EditProfile")}
      </h2>
      <h2
        onClick={() => {
          changeTab("Password");
        }}
        className="text-lg cursor-pointer"
      >
        {t("Password")}
      </h2>
      <h2
        onClick={() => {
          changeTab("Orders");
        }}
        className="text-lg cursor-pointer"
      >
        {t("Orders")}
      </h2>
      <h2
        className="text-red-400 text-lg cursor-pointer"
        onClick={() => confirm(t("SignOut") + "?") && signOut()}
      >
        {t("SignOut")}
      </h2>
    </div>
  ));

  return (
    <NavTer>
      <div className="items-center min-h-[1000px] top-auto w-full h-fit relative">
        <div className="main w-full m-0 max-w-7xl">
          {isLargeScreen ? (
            <>
              <div className="pl-1 flex gap-2 items-center">
                <svg
                  className="main-svg w-7"
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
                <h1 className="text-xl m-1">{`${t("hello")}  ${
                  session.user.name || ""
                }`}</h1>
              </div>
              <hr className="m-3" />
              <div className="profile min-h-[1000px] pt-2 w-full flex">
                <div className="pr-4 border-r-2 border-blue-500">
                  <Menu />
                </div>
                <div className="">{Component}</div>
              </div>
            </>
          ) : (
            <>
              {!isOpen ? (
                <div className="pl-1 flex gap-2 items-center">
                  <svg
                    className="main-svg w-7"
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
                  <h1 className="text-xl m-1">{t("hello")}</h1>
                </div>
              ) : (
                <h1
                  className="text-xl flex p-1"
                  onClick={() => {
                      setIsOpen(false),
                      router.replace(`profile`, { scroll: false });
                  }}
                >
                  <svg
                    className="main-svg !w-7 dark:fill-white fill-black "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" />
                  </svg>
                  {t(`${tab}`)}
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
                  className={`w-full h-full adminContent transition-transform duration-300 ease-in-out ${
                    isOpen
                      ? "translate-x-0 opacity-100 pointer-events-auto"
                      : "-translate-x-full opacity-0 pointer-events-none"
                  } absolute top-0 left-0 w-full shadow-lg`}
                >
                  <div className="mt-4 h-full">{Component}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </NavTer>
  );
};

export default ProfilePage;
