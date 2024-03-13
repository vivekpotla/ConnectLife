import React from 'react'
import PostsLists from '../Posts/PostsList'
import HomeCarousel from './HomeCarousel'
import Lottie from 'lottie-react';
import Footer from '../Footer';
// import Bot from '../../Icons/Animation - 1709051490247.json';
// import Blood from '../../Icons/Animation - 17090548134631.json';
import Donor from '../../Icons/Animation - 1709054933954.json';

const HomePage = () => {
    return (
        <div className='bg-gray-100 p-2'>
            <HomeCarousel />
            <div className='lg:flex justify-between lg:pr-10 bg-blue-gray-500 my-3 mx-1 rounded-xl'>
                <div className="lg:sticky m-4 lg:top-14 lg:h-16 lg:ml-24 ">
                    {/* <Lottie animationData={Bot} loop={true} /> */}
                    {/* <Lottie animationData={Blood} loop={true} /> */}
                    <Lottie animationData={Donor} loop={true} className='cursor-pointer' />
                </div>
                <PostsLists />
            </div>
            
        </div>
    )
}

export default HomePage