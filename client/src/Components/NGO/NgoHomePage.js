import React, { useState } from 'react';
import {CreateCamps} from '../Camps/CreateCamps';
import { CreatePosts } from './CreatePosts';
export const NgoHomePage =()=> {
  return (
    <div>
        <CreateCamps/>
        <CreatePosts/>
    </div>
  )
}