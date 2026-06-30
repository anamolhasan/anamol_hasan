// import { ClerkProvider } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const DashboardLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
  return (
    <div>
        <div>
          <Link href={'/dashboard'} >Dashboard</Link>
        </div>
        <div>
          {children}
        </div>
    </div>
  )
}

export default DashboardLayout