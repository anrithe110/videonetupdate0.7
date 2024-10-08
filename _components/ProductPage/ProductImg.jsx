
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function ProductImg({ imgs }) {


  return (
    <>
      {!imgs ? (
        <div className="swiper-container">
          <div className="px-1 relative pt-[70%] w-[70%] rounded-xl bg-zinc-400 animate-pulse" />
        </div>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={50}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="Swiper3"
        >
          {imgs.map((i, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-container productimg">
                <img
                  src={`/images/${i.img}`}
                  alt={`Product Image ${index + 1}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default ProductImg;





// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";

// function ProductImg({ imgs }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (imgs && imgs.length > 0) {
//       // Simulate data fetching delay with a timeout
//       const timeoutId = setTimeout(() => {
//         setLoading(false);
//       }, 1000); // Adjust the timeout duration as needed

//       // Cleanup function to clear the timeout if imgs changes or component unmounts
//       return () => clearTimeout(timeoutId);
//     } else {
//       setLoading(true);
//     }
//   }, [imgs]);

//   return (
//     <>
//       {loading ? (
//         <div className="swiper-container">
//           <div className="px-1 relative pt-[70%] w-[70%] rounded-xl bg-zinc-400 animate-pulse" />
//         </div>
//       ) : (
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={50}
//           loop={true}
//           navigation={true}
//           modules={[Navigation]}
//           className="Swiper3"
//         >
//           {imgs.map((i, index) => (
//             <SwiperSlide key={index}>
//               <div className="swiper-container productimg">
//                 <img
//                   src={`/images/${i.img}`}
//                   alt={`Product Image ${index + 1}`}
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
//     </>
//   );
// }

// export default ProductImg;