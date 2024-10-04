import React, {Suspense} from 'react'
import Score from './Score'
import Skeletonloader from '@/app/mobile/Skeletonloader'
const Questions = () => {
  return (
    <Suspense fallback={<Skeletonloader />}>
      <Score />
    </Suspense>
  )
}

export default Questions