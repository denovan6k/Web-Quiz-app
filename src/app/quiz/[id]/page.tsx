import React, {Suspense} from 'react'
import Quiz from './Quiz'
import Skeletonloader from '@/app/mobile/Skeletonloader'
const Questions = () => {
  return (
    <Suspense fallback={<Skeletonloader />}>
      <Quiz />
    </Suspense>
  )
}

export default Questions