import Footer from '@/components/Footer'
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
      <main className='container mx-auto mt-20'>
            {children}
      </main>
      <Footer />
    </div>
  )
}

export default HomeLayout