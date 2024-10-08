"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

export default function Banner({banner , className}) {

  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={false}
        spaceBetween={500}
        modules={[Pagination, Autoplay]}
        className={`swiper MainSwiper  ${className}`}
        style={{ maxWidth: "758px" }}
      >
        {banner ? (
          banner.map((Banner, index) => (
            <SwiperSlide key={index}>
              <div className="MainBanner" kay={index}>
                <img alt={Banner.name} src={`/banner/${Banner.image[0]}`} />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="w-full mr-[1000px]">
            <div className="!relative !pt-[56%] !w-[100%] !rounded-xl  bg-zinc-400 animate-pulse" />
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
