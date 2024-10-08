"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CardCover from "@/_components/CardCover";
import ProductImg from "@/_components/ProductPage/ProductImg";
import StatsPart from "@/_components/ProductPage/StatsPart";
import Linked from "@/_components/Linked";
import Model from "@/_components/ProductPage/Model";
import AddToCart from "@/_components/ProductPage/AddToCart";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import url from "@/libs/url.config";
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
    link: "nigga",
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
    link: "nigga",
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
    link: "nigga",
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
    link: "nigga",
  },
];

export default function ProductPage({ session }) {
  const { product: id } = useParams();
  const t = useTranslations("products");
  const localActive = useLocale();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(false);
  const [category, setCategory] = useState({ ge: "", en: "" });

  useEffect(() => {
    const findProduct = async () => {
      try {
        if (id) {
          const response = await fetch(`${url}/api/Products?id=${id}`, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            const data = await response.json();
            setProduct(data.product);
          } else if (response.status === 404 || 400) {
            window.location.href = "/404";
          } else {
            throw new Error("Failed to find product");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    findProduct();

    const mobile = () => setSize(window.innerWidth < 970);
    mobile();
    window.addEventListener("resize", mobile);
    return () => window.removeEventListener("resize", mobile);
  }, [id]);

  useEffect(() => {
    const category_id = product?.category._id;
    if (category_id) {
      const getCategoryName = async () => {
        try {
          const response = await fetch(
            `${url}/api/findCategory?id=${category_id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setCategory(data?.data?.name || { ge: "", en: "" });
          } else {
            throw new Error("Failed to get category");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      getCategoryName();
    }
  }, [product]);
  return (
    <div className="items-center top-auto w-full h-fit">
      <div className="main w-full m-[0px,auto] max-w-5xl ">
        <div className="flex pb-[5px]">
          {product && category ? (
            <>
              <Linked name="home" link="/" />
              <Linked
                name={(category && category[localActive]) || ""}
                link={category && category._id}
              />
              <Linked
                name={product && product.name}
                link={product && product._id}
              />
            </>
          ) : (
            <div className="Card-name  relative pt-[25px] sm:w-[30%]  w-[50%] mt-2 rounded-xl  !min-h-4  bg-zinc-400 animate-pulse" />
          )}
        </div>
        <hr />
        <div className="productPage mt-5">
          <div className="page-1 m-3">
            {product ? (
              <ProductImg imgs={product.images} />
            ) : (
              <div className="swiper-container">
                <div className="px-1 relative pt-[70%] w-[70%] rounded-xl bg-zinc-400 animate-pulse" />
              </div>
            )}
            {(size || !product) && (
              <Model
                className="modelmobile"
                model={t("model")}
                brand={t("brand")}
                modelvalue={product && product.name}
                brandvalue={product && product.brand}
              />
            )}
            <StatsPart
              localActive={localActive}
              specs={t("specs")}
              stats={product && product.stats}
            />
            <CardCover max={4} data={Data} name="მსგავსი პროდუქცია" />
          </div>
          <div className="page-2">
            <div className="PriseModel flex text-lg flex-col items-center gap-2 h-fit">
              {(!size || !product) && (
                <Model
                  model={t("model")}
                  brand={t("brand")}
                  modelvalue={product && product.name}
                  brandvalue={product && product.brand}
                />
              )}
              <AddToCart
                price={product && product.price}
                session={session}
                productId={id}
                cartButton={session ? t("order") : t("cart")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
