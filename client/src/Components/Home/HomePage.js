import React from 'react'
import PostsLists from '../Posts/PostsList'
import HomeCarousel from './HomeCarousel'

const HomePage = () => {
    return (
        <div className='bg-gray-100 p-2'>
            <HomeCarousel />
            <PostsLists />
        </div>
    )
}

export default HomePage