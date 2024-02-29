import React from 'react'
import PostsLists from './Posts/PostsList'
import HomeCarousel from './Home/HomeCarousel'

const HomePage = () => {
    return (
        <div className='bg-gray-100 p-4'>
            <HomeCarousel />
            <PostsLists />
        </div>
    )
}

export default HomePage