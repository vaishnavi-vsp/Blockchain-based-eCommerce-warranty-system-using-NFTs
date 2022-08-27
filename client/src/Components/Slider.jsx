import React from "react"
import SlideCard from "./SlideCard"
import Categories from './Categories'
import '../App.css';
const SliderHome = () => {
  return (
    <>
    <section className='home'>
        <div className='container d_flex'>
          <section className='homeSlide contentWidth'>
            <div className='container'>
              <SlideCard />
            </div>
          </section>
          <Categories />
        </div>
      </section>
    </>
  )
}

export default SliderHome
