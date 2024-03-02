import { Carousel } from '@material-tailwind/react'
import React from 'react'

const HomeCarousel = () => {
    return (
        <div className='lg:mx-2 h-[85vh]'>
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
                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                    alt="image1"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                    alt="image2"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                    alt="image3"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://images.pexels.com/photos/612891/pexels-photo-612891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="image3"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="image3"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg"
                    alt="image3"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg"
                    alt="image3"
                    className="h-full w-full object-cover"
                />
            </Carousel>
        </div>
    );
}

export default HomeCarousel