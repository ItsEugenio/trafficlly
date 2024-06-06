import React from 'react'
import Pcard from '../components/Pcard'
function About() {
  return (
    <div className="bg-slate-100 h-screen">
    <div
      className="p-12 grid 
  sm:grid-cols-2 gap-2
  md:grid-cols-3 gap-2
  lg:grid-cols-4 gap-6
  "
    >
      <Pcard />
      <Pcard />
      <Pcard />
      <Pcard />
      <Pcard />
      <Pcard />
    </div>
  </div>
  )
}

export default About
