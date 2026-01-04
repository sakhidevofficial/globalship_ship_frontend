// components/home/HeroSearchGrid.jsx
'use client'
'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import Image from 'next/image'

const HeroSearchGrid = () => {
  const images = [
    '/img/home/single-product/pro/SlideF01.jpg',
    '/img/home/single-product/pro/SlideF02.jpg',
    '/img/home/single-product/pro/SlideF03.jpg',
    '/img/home/single-product/pro/SlideF04.jpg',
    '/img/home/single-product/pro/SlideF05.jpg',
    '/img/home/single-product/pro/SlideF06.jpg',
    '/img/home/single-product/pro/SlideF01.jpg',
    '/img/home/single-product/pro/SlideF02.jpg',
    '/img/home/single-product/pro/SlideF03.jpg',
    '/img/home/single-product/pro/SlideF04.jpg',
  ]

  return (
    <div className="w-100 position-relative min-vh-50 d-flex flex-column align-items-center justify-content-center bg-white">
      {/* Sliders Section */}
      <div className="w-100 position-relative">
        {[5000, 7000, 9000].map((speed, sliderIdx) => (
          <div className="mb-2" key={sliderIdx}>
            <Swiper
              modules={[Autoplay, FreeMode]}
              slidesPerView={7}
              loop={true}
              freeMode={{ enabled: true, momentum: false }}
              speed={speed}
              autoplay={{
                delay: 0, // 👈 1. Autoplay delay ko 0 kar dein
                disableOnInteraction: false,
                // 2. Main change yahan hai
                reverseDirection: sliderIdx === 1, // Agar index 1 hai (second row) toh reverse kar do
                // Ya (index odd ho toh): reverseDirection: sliderIdx % 2 !== 0,
              }}
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 7 },
              }}
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className=""
                    style={
                      {
                        // width: '100%',
                        // height: '150px',
                        // borderRadius: '15px',
                        // overflow: 'hidden',
                        // boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      }
                    }
                  >
                    <Image
                      src={src}
                      alt="brand"
                      width={170}
                      height={170}
                      style={{ objectFit: 'cover', borderRadius: '15px' }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>

      <div
        className="bg-white rounded-circle translate-middle position-absolute z-1 start-50"
        style={{
          width: '500px',
          height: '500px',
          filter: 'blur(2rem)',
          top: '25%',
        }}
      ></div>

      {/* Center Search */}
      <div className="position-absolute text-center top-50 start-50 translate-middle z-3">
        <h3 className="display-2 fw-bold mb-4 text-primary">shop</h3>
        <div
          className="d-flex align-items-center bg-white rounded-pill shadow px-3 py-2 mx-auto"
          style={{ maxWidth: '600px' }}
        >
          <input type="text" placeholder="Search products, brands..." className="form-control border-0 flex-grow-1" />
          <button className="btn btn-primary rounded-pill px-4">Search</button>
        </div>
      </div>
    </div>
  )
}

export default HeroSearchGrid

// // components/home/HeroSearchGrid.jsx
// 'use client'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay, FreeMode } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/free-mode'
// import Image from 'next/image'

// const HeroSearchGrid = () => {
//   const images = [
//     '/img/home/single-product/pro/SlideF01.jpg',
//     '/img/home/single-product/pro/SlideF02.jpg',
//     '/img/home/single-product/pro/SlideF03.jpg',
//     '/img/home/single-product/pro/SlideF04.jpg',
//     '/img/home/single-product/pro/SlideF05.jpg',
//     '/img/home/single-product/pro/SlideF06.jpg',
//     '/img/home/single-product/pro/SlideF07.jpg',
//     '/img/home/single-product/pro/SlideF08.jpg',
//     '/img/home/single-product/pro/SlideF09.jpg',
//     '/img/home/single-product/pro/SlideF10.jpg',
//   ]

//   return (
//     <div className="position-relative w-100 min-vh-50 d-flex flex-column align-items-center justify-content-center bg-white">
//       {/* Sliders Section */}
//       <div className="w-100 container py-5">
//         {[4000, 6000, 8000].map((speed, sliderIdx) => (
//           <div className="mb-5" key={sliderIdx}>
//             <Swiper
//               modules={[Autoplay, FreeMode]}
//               spaceBetween={20}
//               slidesPerView={6}
//               freeMode={true}
//               loop={true}
//               speed={speed} // continuous movement speed
//               autoplay={{
//                 delay: 0, // no pause
//                 disableOnInteraction: false,
//               }}
//               breakpoints={{
//                 320: { slidesPerView: 2 },
//                 640: { slidesPerView: 3 },
//                 1024: { slidesPerView: 6 },
//               }}
//             >
//               {images.map((src, idx) => (
//                 <SwiperSlide key={idx}>
//                   <div
//                     className="position-relative w-100"
//                     style={{
//                       height: '150px',
//                       borderRadius: '15px',
//                       overflow: 'hidden',
//                       boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//                     }}
//                   >
//                     <Image src={src} alt="brand" fill style={{ objectFit: 'cover' }} />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         ))}
//       </div>

//       {/* Center Search */}
//       <div className="position-absolute text-center top-50 start-50 translate-middle z-1">
//         <h1 className="display-4 fw-bold mb-4 text-primary">shop</h1>
//         <div
//           className="d-flex align-items-center bg-white rounded-pill shadow px-3 py-2 mx-auto"
//           style={{ maxWidth: '600px' }}
//         >
//           <input type="text" placeholder="Search products, brands..." className="form-control border-0 flex-grow-1" />
//           <button className="btn btn-primary rounded-pill px-4">Search</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default HeroSearchGrid

// // components/home/HeroSearchGrid.jsx
// 'use client'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Autoplay, FreeMode } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/free-mode'
// import Image from 'next/image'

// const HeroSearchGrid = () => {
//   const images = [
//     '/img/home/single-product/pro/SlideF01.jpg',
//     '/img/home/single-product/pro/SlideF02.jpg',
//     '/img/home/single-product/pro/SlideF03.jpg',
//     '/img/home/single-product/pro/SlideF04.jpg',
//     '/img/home/single-product/pro/SlideF05.jpg',
//     '/img/home/single-product/pro/SlideF06.jpg',
//     '/img/home/single-product/pro/SlideF07.jpg',
//     '/img/home/single-product/pro/SlideF08.jpg',
//     '/img/home/single-product/pro/SlideF09.jpg',
//     '/img/home/single-product/pro/SlideF10.jpg',
//   ]

//   return (
//     <div className="position-relative w-100 min-vh-50 d-flex flex-column align-items-center justify-content-center bg-white">
//       {/* Slider Section */}
//       <div className="w-100 container py-5">
//         {[2500, 3000, 3500].map((delay, sliderIdx) => (
//           <div className="mb-5" key={sliderIdx}>
//             <Swiper
//               modules={[Navigation, Autoplay, FreeMode]}
//               spaceBetween={20}
//               slidesPerView={6}
//               freeMode={true}
//               autoplay={{ delay, disableOnInteraction: false }}
//               loop
//               breakpoints={{
//                 320: { slidesPerView: 2 },
//                 640: { slidesPerView: 3 },
//                 1024: { slidesPerView: 6 },
//               }}
//             >
//               {images.map((src, idx) => (
//                 <SwiperSlide key={idx}>
//                   <div
//                     className="position-relative w-100"
//                     style={{
//                       height: '150px',
//                       borderRadius: '15px',
//                       overflow: 'hidden',
//                       boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//                     }}
//                   >
//                     <Image src={src} alt="brand" fill style={{ objectFit: 'cover' }} />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         ))}
//       </div>

//       {/* Center Search */}
//       <div className="position-absolute text-center top-50 start-50 translate-middle z-1">
//         <h1 className="display-4 fw-bold mb-4 text-primary">shop</h1>
//         <div
//           className="d-flex align-items-center bg-white rounded-pill shadow px-3 py-2 mx-auto"
//           style={{ maxWidth: '600px' }}
//         >
//           <input type="text" placeholder="Search products, brands..." className="form-control border-0 flex-grow-1" />
//           <button className="btn btn-primary rounded-pill px-4">Search</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default HeroSearchGrid
