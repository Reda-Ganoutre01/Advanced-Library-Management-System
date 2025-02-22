import { BookCard } from "../Book/BookCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import bookService from '../../services/bookService';

export default function TopBooks (){
  const [topBookslist,setTopBookslist]=useState([])

  useEffect(()=>{
    bookService.getTopBrrowRecordsBooks()
    .then((response)=>
       setTopBookslist(response.data)
      )
    
  },[])
  return (
    <div className="container mx-auto px-4">
      <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center underline decoration-primary"
      data-aos="zoom-in-down"
      >
  Top Books
</h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          // pagination={{ clickable: true }}
          loop={true}  // Ensures looping of slides
          autoplay={{
            delay: 2000,  // Slide transition after 3 seconds
            disableOnInteraction: false,  // Ensures autoplay continues even after user interaction
          }}
          breakpoints={{
            640: { slidesPerView: 2  ,spaceBetween: 5},
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
            1280: { slidesPerView: 5, spaceBetween: 5 },
          }}
          modules={[Navigation, Pagination, Autoplay]}  
          className="mySwiper"
        >
          {topBookslist.length > 0 ? ( topBookslist.map((book, index) => (
              <SwiperSlide key={index} className='flex justify-center'>
                <BookCard book={book}  />
              </SwiperSlide>
            ))):''
           }
        </Swiper>
      </div>
    </div>
  );
};
