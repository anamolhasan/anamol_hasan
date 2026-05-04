import Navbar from '@/components/Navbar'
import React from 'react'

const HomeLayout = ({
    children
}:{
  children:React.ReactNode
}) => {
  return (
    <div>
      <Navbar />
      <main className='container mx-auto'>
            {children}
      </main>
    </div>
  )
}

export default HomeLayout