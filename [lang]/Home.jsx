"use client";
import React, { useState, useEffect } from "react";
import Catalog from "@/_components/Menu/Catalog";
import Banner from "@/_components/HomePage/Banner";
import Container from "@/_components/Container";
import NavTer from "@/_components/NavTer";
import CardCover from "@/_components/CardCover";
import Brands from "@/_components/HomePage/Brands";
import url from "@/libs/url.config";
import Banner2 from "@/_components/Banner2";
////////////////////////////////////////////////////////////////////////
const Data = [
  {
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQzTaIYM7dNOyWKWVwvnht0fbCOS95tMIeyfFlv79GO615DJVbWsDM8o5z-Pogx-fl5BfLpUfJFO6hmpWuh_5ObkGiRNeymfqF8wmlcrDnOW_frYG9ccr_R41hM8971&usqp=CAc",
    name: "DS-2CD2783G2-IZS 8MP",
    prise: 150,
    link: "nosd",
  },
  {
    img: "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/hikvision_acusense_ds_2cd2783g2_izs_8mp_outdoor_1651688440_1703154.jpg",
    name: "DS-2CD203G2 4MP",
    prise: 130,
    link: "srv",
  },
  {
    img: "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/hikvision_ds_2cd2087g2_l_4mm_ds_2cd2087g2_l_colorvu_8mp_outdoor_1610098523_1614279.jpg",
    name: "DS-2CD2783G2-IZS 2MP",
    prise: 50,
    link: "ecv",
  },
  {
    img: "https://i.ebayimg.com/images/g/NXwAAOSwiSlle3yH/s-l960.jpg",
    name: "DS-2CD2783G2-IZS 8MP",
    prise: 550,
    link: "susi",
  },
  {
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQzTaIYM7dNOyWKWVwvnht0fbCOS95tMIeyfFlv79GO615DJVbWsDM8o5z-Pogx-fl5BfLpUfJFO6hmpWuh_5ObkGiRNeymfqF8wmlcrDnOW_frYG9ccr_R41hM8971&usqp=CAc",
    name: "DS-2CD2783G2-IZS 8MP",
    prise: 150,
    link: "nosd",
  },
  {
    img: "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/hikvision_acusense_ds_2cd2783g2_izs_8mp_outdoor_1651688440_1703154.jpg",
    name: "DS-2CD203G2 4MP",
    prise: 130,
    link: "srv",
  },
  {
    img: "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/hikvision_ds_2cd2087g2_l_4mm_ds_2cd2087g2_l_colorvu_8mp_outdoor_1610098523_1614279.jpg",
    name: "DS-2CD2783G2-IZS 2MP",
    prise: 50,
    link: "ecv",
  },
  {
    img: "https://i.ebayimg.com/images/g/NXwAAOSwiSlle3yH/s-l960.jpg",
    name: "DS-2CD2783G2-IZS 8MP",
    prise: 550,
    link: "susi",
  },
  {
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQzTaIYM7dNOyWKWVwvnht0fbCOS95tMIeyfFlv79GO615DJVbWsDM8o5z-Pogx-fl5BfLpUfJFO6hmpWuh_5ObkGiRNeymfqF8wmlcrDnOW_frYG9ccr_R41hM8971&usqp=CAc",
    name: "DS-2CD2783G2-IZS 8MP",
    prise: 150,
    link: "nosd",
  },
  {
    img: "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/hikvision_acusense_ds_2cd2783g2_izs_8mp_outdoor_1651688440_1703154.jpg",
    name: "DS-2CD203G2 4MP",
    prise: 130,
    link: "srv",
  },
  {
    img: "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/hikvision_ds_2cd2087g2_l_4mm_ds_2cd2087g2_l_colorvu_8mp_outdoor_1610098523_1614279.jpg",
    name: "DS-2CD2783G2-IZS 2MP",
    prise: 50,
    link: "ecv",
  },
  {
    img: "https://i.ebayimg.com/images/g/NXwAAOSwiSlle3yH/s-l960.jpg",
    name: "DS-2CD2783G2-IZS 8MP",
    prise: 550,
    link: "susi",
  },
  {
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQzTaIYM7dNOyWKWVwvnht0fbCOS95tMIeyfFlv79GO615DJVbWsDM8o5z-Pogx-fl5BfLpUfJFO6hmpWuh_5ObkGiRNeymfqF8wmlcrDnOW_frYG9ccr_R41hM8971&usqp=CAc",
    name: "DS-2CD2783G2-IZS 8MP",
    prise: 150,
    link: "nosd",
  },
  {
    img: "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/hikvision_acusense_ds_2cd2783g2_izs_8mp_outdoor_1651688440_1703154.jpg",
    name: "DS-2CD203G2 4MP",
    prise: 130,
    link: "srv",
  },
  {
    img: "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/hikvision_ds_2cd2087g2_l_4mm_ds_2cd2087g2_l_colorvu_8mp_outdoor_1610098523_1614279.jpg",
    name: "DS-2CD2783G2-IZS 2MP",
    prise: 50,
    link: "ecv",
  },
  {
    img: "https://i.ebayimg.com/images/g/NXwAAOSwiSlle3yH/s-l960.jpg",
    name: "DS-2CD2783G2-IZS 8MP",
    prise: 550,
    link: "susi",
  },
];
////////////////////////////////////////////////////////////////////////
export default function Home() {
  const [banner, setBanner] = useState();
  const find_banner = async () => {
    try {
      const response = await fetch(`${url}/api/Banner`);
      if (response.ok) {
        const data = await response.json();
        const BannerArr = data.banner;
        setBanner(BannerArr);
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

  useEffect(() => {
    find_banner();
  }, []);
  return (
    <NavTer>
      <Container className="pt-4">
        <Catalog />
          {banner ? <Banner className={"absolute"} banner={banner} /> : <div className="pt-[52%] sm:pt-[42%] w-[100%] max-w-[758px] rounded-2xl bg-zinc-400 animate-pulse " />  }
      </Container>
      <CardCover max={5} data={Data} name="stuff" />
      <Brands />
      <CardCover max={5} data={Data} name="stuff" />

        <Banner2/>
   
    </NavTer>
  );
}
