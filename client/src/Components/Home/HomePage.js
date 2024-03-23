import React from 'react';
import { Link } from 'react-router-dom';
import PostsLists from '../Posts/PostsList';
import HomeCarousel from './HomeCarousel';
import Footer from '../Footer';
import homeIcon1 from "../Images/homeIcon1.png";
import homeIcon2 from "../Images/homeIcon2.png";
import homeIcon3 from "../Images/homeIcon3.png";
import homeIcon4 from "../Images/homeIcon4.png";
import Donor from '../../Icons/Animation - 1709054933954.json';
import Card from './CarouselCard';
import Lottie from 'lottie-react';

const HomePage = () => {
    return (
        <div className='bg-gray-100 p-2'>
            <HomeCarousel />
            {/* Icons below carousel */}
            <div className="flex justify-center mt-8">
                <div className="flex items-center">
                    <Link to="/donationprocess" className="mr-8 flex flex-col items-center">
                        <img src={homeIcon1} alt="Icon 1" className="w-16 h-16 p-2 rounded-full border border-gray-400" />
                        <p className="text-gray-600 text-center">Blood Donation process</p>
                    </Link>
                    <Link to="/donorfaqs" className="mr-8 flex flex-col items-center">
                        <img src={homeIcon3} alt="Icon 3" className="w-16 h-16 p-2 rounded-full border border-gray-400 " />
                        <p className="text-gray-600 text-center">Can I donate?</p>
                    </Link>
                    <Link to="/camps" className="mr-8 flex flex-col items-center">
                        <img src={homeIcon4} alt="Icon 4" className="w-16 h-16 p-2 rounded-full border border-gray-400" />
                        <p className="text-gray-600 text-center">Camps near me</p>
                    </Link>
                    <Link to="/bloodprocessing" className="flex flex-col items-center">
                        <img src={homeIcon2} alt="Icon 2" className="w-16 h-16 p-2 rounded-full border border-gray-400" />
                        <p className="text-gray-600 text-center">Blood Processing</p>
                    </Link>
                </div>
            </div>
            <div className='lg:flex justify-between lg:pr-10 bg-blue-gray-500 my-3 mx-1 rounded-xl'>
            <PostsLists />
            <div className="lg:sticky m-4 lg:top-14 lg:h-16 lg:ml-24 ">
                    {/* <Lottie animationData={Bot} loop={true} /> */}
                    {/* <Lottie animationData={Blood} loop={true} /> */}
                    <Lottie animationData={Donor} loop={true} className='cursor-pointer' />
                </div>
                {/* <div className="lg:sticky m-4 mt-8 lg:top-14 lg:h-16 lg:ml-24 ">
                    <Card />
                </div> */}
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
