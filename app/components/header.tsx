import React from 'react'
import TopBanner from './topBanner'
import Navbar from './nav/navbar'

export default function Header() {
  return (
    <div className="flex flex-col gap-3 justify-center w-full -mt-1 ">
      <TopBanner/>
      <Navbar/>
    </div>
  )
}
