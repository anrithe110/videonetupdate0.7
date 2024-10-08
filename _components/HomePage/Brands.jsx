"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import url from "@/libs/url.config";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslations } from "next-intl";
import { Autoplay } from "swiper/modules";
function Brands() {
  const [brands, setBrands] = useState();
  const findBarnds = async () => {
    try {
      const response = await fetch(`${url}/api/Brands`);
      if (response.ok) {
        const data = await response.json();
        const BrandsArr = data.brands;
        setBrands(BrandsArr);
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
  const t = useTranslations("brand");
  const [swiperInstance, setSwiperInstance] = useState(Number);

  useEffect(() => {
    findBarnds();
    const updateSlidesPerView = () => {
      if (window.innerWidth < 500) {
        setSwiperInstance(2);
      } else if (window.innerWidth < 750) {
        setSwiperInstance(3);
      } else {
        setSwiperInstance(4);
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  return (
    <div
      className="Card-Cover items-center top-auto w-full h-fit p-5 ml-3 mr-3"
      style={{ padding: "0px" }}
    >
      <div
        className="main w-full m-[0px,auto] max-w-4xl"
        style={{ padding: "0px 0px 10px 0px" }}
      >
        <div className="w-full m-[0px,auto] max-w-4xl items-start pt-2 pb-4 pl-4">
          <h1>{t("brands")}</h1>
        </div>
        <Swiper
          slidesPerView={swiperInstance ? swiperInstance : 2}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={false}
          modules={[Autoplay]}
          className="Swiper6"
        >
          {brands ? (
            brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="brandBack" kay={index}>
                  <img alt={brand.name} src={`/brands/${brand.image[0]}`} />
                </div>
              </SwiperSlide>
            ))
          ) :(
            [...Array(6)].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="brandBack  !bg-zinc-400 !animate-pulse !border-none" />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default Brands;
