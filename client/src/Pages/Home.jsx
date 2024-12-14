import React from 'react'
import Coursal from "../components/Coursal";
import Coursal2 from "../components/Coursal2";
import CoursesCarousel from '../components/Courses';
import BlogsCarousel from '../components/Updates';
const Home = () => {
  return (
    <>
    <Coursal/>
    <Coursal2/>
    <CoursesCarousel/>
    <BlogsCarousel/>
    </>
  )
}

export default Home