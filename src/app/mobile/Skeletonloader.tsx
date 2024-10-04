import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
const Skeletonloader = () => {
  return (
    <>
     <div className='p-[24px] flex flex-col tl:p-[32px] min-h-screen lg:px-[140px]  '>
        <header className='flex items-center justify-between mb-[32px]'>
          <div className='flex items-center' >
          <span className={` p-[6px] items-center rounded-lg`}>
            <Skeleton className='w-[40px] h-[40px]' />
          </span>
          <Skeleton className='ml-[16px] tl:ml-[24px] h-[18px] kl:h-[28px]'/>
          </div>
         <div className='flex items-center gap-2'>
         <Skeleton className='w-[16px] h-[16px]' />
          <Skeleton className='w-[16px] h-[16px]'/>
          <Skeleton className='w-[16px] h-[16px]'/>

        
         </div>
        </header>
       <div className='lg:grid lg:grid-cols-2 lg:gap-[120px] kl:mt-[64px] '>
        <section className='flex flex-col gap-4 lg:mt-[40px]'>
          <Skeleton className=' h-[14px] kl:h-[20px]'/>
          <Skeleton className=' h-[20px] kl:h-[36px]'/>
          <Skeleton className=' h-[20px] kl:h-[36px] mt-[40px]'/>
        </section>

        <section className='flex flex-col mt-[40px] tl:mt-[64px]'>
         
                            <Skeleton
                            
                        className={` rounded-2xl min-h-[64px] kl:min-h-[80px]  p-[12px]   mb-[12px] kl:mb-[24px] w-full
                          
                        `}
                        
                      />
                      <Skeleton
                      
                  className={` rounded-2xl min-h-[64px] kl:min-h-[80px]  p-[12px]   mb-[12px] kl:mb-[24px] w-full
                    
                  `}
                  
                />
                <Skeleton
                
            className={` rounded-2xl min-h-[64px] kl:min-h-[80px]  p-[12px]   mb-[12px] kl:mb-[24px] w-full
              
            `}

            />
                            <Skeleton
                            
                        className={` rounded-2xl min-h-[64px] kl:min-h-[80px]  p-[12px]   mb-[12px] kl:mb-[24px] w-full
                          
                        `}
                        
                      />
                            
            
                    
        </section>
        </div>
      </div>
    </>
  )
}

export default Skeletonloader