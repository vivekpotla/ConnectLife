import { Carousel } from '@material-tailwind/react'
import React from 'react'
import Carousel1 from '../Images/Carousel1.png'
import Carousel2 from '../Images/Carousel2.png'
import Carousel3 from '../Images/Carousel3.png'
import Carousel5 from '../Images/Carousel5.png'
import Carousel7 from '../Images/Carousel7.png'

const HomeCarousel = () => {
    return (
        <div className='lg:mx-2 h-[55vh]'>
            <Carousel
                className="rounded-xl"
                autoplay={true}
                loop={true}
                autoplayDelay={4000}
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                    }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                <img
                    src={Carousel1}
                    alt="image1"
                    className="h-full w-full object-cover"
                />
                <img
                    src={Carousel2}
                    alt="image2"
                    className="h-full w-full object-cover"
                />
                <img
                    src={Carousel3}
                    alt="image3"
                    className="h-full w-full object-cover"
                />
                <img
                    src={Carousel5}
                    alt="image3"
                    className="h-full w-full object-cover"
                />
                <img
                    src={Carousel7}
                    alt="image3"
                    className="h-full w-full object-cover"
                />
            </Carousel>
        </div>
    );
}

export default HomeCarousel