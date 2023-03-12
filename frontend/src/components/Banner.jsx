import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const bannerImage = [
  {
    imageUrl: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/%D8%A7%D8%B3%D9%BE%D8%B1%DB%8C_%D8%B1%D9%86%DA%AF_%D9%85%D8%AA%D8%A7%D9%84%DB%8C%DA%A9.jpg',
    imageUrlPhone: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/1adbab4b-09b1-4eec-8366-379a8e817cde.png'
  },
  {
    imageUrl: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/sprayAlvanBannerLarge.jpeg',
    imageUrlPhone: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/sprayAlvanBannerPhone.jpeg'

  }

]


function Banner() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });


  return (
    <div className=' flex justify-center'>
      <Carousel className='  items-center m-2 md:mx-6 ' showArrows={false} showStatus={false} showThumbs={false} autoPlay infiniteLoop >

        {bannerImage.map((banner, i) => (

          

          <div key={i} className='rounded-3xl'>

            <img className=' rounded-3xl' src={windowSize[0] >= 768 ? banner.imageUrl : banner.imageUrlPhone} alt="banner image" />

          </div>

        ))}



        {/* {windowSize[0] >= 768 ? <div className='rounded-3xl hidden md:block'>
        <img className=' rounded-3xl'  src="https://zamshop.s3.ir-thr-at1.arvanstorage.ir/%D8%A7%D8%B3%D9%BE%D8%B1%DB%8C_%D8%B1%D9%86%DA%AF_%D9%85%D8%AA%D8%A7%D9%84%DB%8C%DA%A9.jpg" />
      </div> : <div className='rounded-3xl block md:hidden'>
        <img className=' rounded-3xl'  src="https://zamshop.s3.ir-thr-at1.arvanstorage.ir/1adbab4b-09b1-4eec-8366-379a8e817cde.png" />
      </div> } */}

      </Carousel></div>
  )
}

export default Banner