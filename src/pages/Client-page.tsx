import React from 'react'
import ClientLeftSection from '../components/client/ClientLeftSection'
import ClientRightSection from '../components/client/ClientRightSection'

const CLientPage = () => {
  return (
    <div className='flex w-full p-20 gap-10'>
        <ClientLeftSection />
        <ClientRightSection />
    </div>
  )
}

export default CLientPage