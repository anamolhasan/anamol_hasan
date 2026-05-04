// import { ClerkProvider } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const DashboardLayout = ({
    admin
}:{
    admin:React.ReactNode
}) => {
  return (
    <div>
        <div>
          <Link href={'/dashboard'} >Dashboard</Link>
        </div>
        <div>
          {admin}
        </div>
    </div>
  )
}

export default DashboardLayout