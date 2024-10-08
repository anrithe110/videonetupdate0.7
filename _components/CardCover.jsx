"use client";
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import Card from './Card';



function CardCover(props) {
  const max = props.max
  const [swiperInstance, setSwiperInstance] = useState(max || 5);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 425) {
        setSwiperInstance(2);
      } else if (window.innerWidth < 768) {
        setSwiperInstance(3);
      } else if (window.innerWidth < 1024) {
        setSwiperInstance(4);
      } else {
        setSwiperInstance(max);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);
  const Data = props.data
  return (
    <div className="Card-Cover items-center top-auto w-full h-fit" style={{ padding: "0px" }}>
      <div className="main w-full m-[0px,auto] max-w-4xl" style={{ padding: "0px 0px 10px 0px" }}>
        <div className="w-full m-[0px,auto] max-w-4xl items-start pt-2 pb-4 pl-4">
          <h1>{props.name}</h1>
        </div>
        <Swiper
          slidesPerView={swiperInstance}
          spaceBetween={10}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={false}
          modules={[Autoplay]}
          className="Swiper5"
        >
          {
           Data ? ( Data.map((item , index) => (
              <SwiperSlide key={index}>
                <div className='cardInSwiper'  >
                  <Card
                    img={item.img}
                    name={item.name}
                    price={item.prise}
                    link={`${item.link}`}
                  />
                </div>
              </SwiperSlide>
             )
            )) : (
              [...Array(6)].map((_, index) => (
                <SwiperSlide key={index}>
                   <div className='cardInSwiper'  >
                  <Card
                    img={undefined}
                    name={undefined}
                    price={null}
                    link1={undefined}
                    link2={undefined}
                  />
                </div>
                </SwiperSlide>
              ))
            )
          }
        </Swiper>
      </div>
    </div>
  );
}

export default CardCover;