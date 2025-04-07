// @ts-nocheck
import React, { useContext, useEffect } from 'react'
import CandidateLeftSection from '../components/candidate/CandidateLeftSection'
import CandidateRightSection from '../components/candidate/CandidateRightSection'
import { API_POST } from '../utils/api_structure'

const CandidateProfilePage = () => {

  return (
    <div className='flex w-full p-20 gap-10'>
        <CandidateLeftSection />
        <CandidateRightSection />
    </div>
  )
}

export default CandidateProfilePage