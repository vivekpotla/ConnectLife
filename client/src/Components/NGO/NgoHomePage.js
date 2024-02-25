import React, { useState } from 'react';
import {CreateCamps} from '../Camps/CreateCamps';
import { CreatePosts } from '../Posts/CreatePosts';
export const NgoHomePage =()=> {
  return (
    <div className='mt-36 flex justify-center'>
        <CreateCamps/>
        <CreatePosts/>
    </div>
  )
}