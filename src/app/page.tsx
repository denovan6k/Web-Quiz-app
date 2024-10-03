import React from 'react'
import dynamic from 'next/dynamic';
const Mobile = dynamic(() => import('./mobile/page'));


const Home = () => {
  return (
    <div>
  
      <Mobile />
   
      
    </div>
  )
}

export default Home