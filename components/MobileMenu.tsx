'use client'
import { AlignLeft } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import Sidebar from './Sidebar'

const MobileMenu = () => {
  const [isSidebarOpen,setIsSidebarOpen]= useState(false);
  return (
    <>
      <button onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>
        <AlignLeft className='hover:text-darkColor hoverEffect md:hidden'></AlignLeft>
      </button>
      <div className='md:hidden'>
        <Sidebar 
        isOpen={isSidebarOpen}
        onClose = {() => setIsSidebarOpen(false)}
        />
      </div>
    </>
  )
}

export default MobileMenu
