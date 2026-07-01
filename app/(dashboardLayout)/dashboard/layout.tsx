// import { ClerkProvider } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const DashboardLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
  return (
    <div className='mt-24'>
        <div className='flex justify-center items-center max-h-full max-w-full mx-auto'>
          <Link href={'/'} >
            <span className="text-xl font-bold text-green-500">Anamol Hasan</span>
          </Link>
        </div>
        <div>
          {children}
        </div>
    </div>
  )
}

export default DashboardLayout