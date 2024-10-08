import React from "react";
import NavTer from "@/_components/NavTer";
import { useTranslations } from "next-intl";
export default function Error() {
    const t = useTranslations("404");
  return (
    <NavTer classNameBottom="!pb-[55px]">
      <div className="flex flex-col mt-24 mb-24 align-middle items-center text-center">
        <img src="/404cam.png" className="w-[300px] p-10"/>
        <h1 className="p-14 text-2xl">{t('error')}</h1>
      </div>
    </NavTer>
  );
}
