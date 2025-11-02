"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

const heroImages = [
  { imgUrl: '/assets/images/hero-1.svg', alt: 'smartwatch'},
  { imgUrl: '/assets/images/hero-2.svg', alt: 'bag'},
  { imgUrl: '/assets/images/hero-3.svg', alt: 'lamp'},
  { imgUrl: '/assets/images/hero-4.svg', alt: 'air fryer'},
  { imgUrl: '/assets/images/hero-5.svg', alt: 'chair'},
]

const HeroCarousel = () => {
  return (
    <div className="hero-carousel relative w-full">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showArrows={false}
        showStatus={false}
        showIndicators={true}
        swipeable={true}
        emulateTouch={true}
        className="w-full"
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <button
            type="button"
            className={`inline-block w-2 h-2 rounded-full mx-1 ${
              isSelected ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
          />
        )}
      >
        {heroImages.map((image) => (
          <div key={image.alt} className="carousel-slide flex justify-center items-center h-full py-4">
            <div className="w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px]">
              <Image 
                src={image.imgUrl}
                alt={image.alt}
                width={300}
                height={300}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        ))}
      </Carousel>

      {/* Optional: Remove or make arrow much smaller */}
      <Image 
        src="/assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={80}
        height={80}
        className="max-xl:hidden absolute -left-[5%] bottom-0 z-0"
      />
    </div>
  )
}

export default HeroCarousel