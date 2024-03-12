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
                    src="https://t3.ftcdn.net/jpg/06/49/51/66/240_F_649516614_IoDWpGxsjFcaGxB42aCTFUJH3APc8P1r.jpg"
                    alt="image1"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://t3.ftcdn.net/jpg/06/06/44/38/240_F_606443804_jYagxn3GcTCUAY02Zac0Tb9Dj30vd6UF.jpg"
                    alt="image2"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://t3.ftcdn.net/jpg/06/02/58/12/240_F_602581280_pAXoal2kLdulVv72ib7zVHhh2QlKEPUr.jpg"
                    alt="image3"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://t3.ftcdn.net/jpg/06/02/58/12/240_F_602581280_pAXoal2kLdulVv72ib7zVHhh2QlKEPUr.jpg"
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