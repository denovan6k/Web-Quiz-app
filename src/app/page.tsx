import React, { Suspense } from 'react'
import dynamic from 'next/dynamic';
import Skeletonloader from './mobile/Skeletonloader';
const Mobile = dynamic(() => import('./mobile/page'));


const Home = () => {
  return (
    <div>
      
     
          <Suspense fallback={<Skeletonloader />}> 
          <Mobile />
          </Suspense>

    </div>
  )
}

export default Home