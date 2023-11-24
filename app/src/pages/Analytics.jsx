import React from 'react'
import './pool.css'

function Analytics() {
  return (
    <div className='px-4 py-6'>
      <h1 className='text-3xl mb-6 -ml-20 xl:ml-0 font-semibold text-center '>
        Pools
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="max-w-xs rounded-xl overflow-hidden shadow-lg grainy-gradient hover:shadow-2xl transition-shadow duration-500 relative ">
        <div className="pb-4 z-10 relative">
          <div className="flex text-md mb-4 items-center tracking-widest font-extralight justify-center">
              <span className='w-full bg-blue-100 px-6 py-2 text-center text-blue-600 text-xs'>Holiday Fund</span>
          </div>
          <div className="px-6 text-center">
            <div className="text-blue-500 text-4xl font-semibold py-2">$5,000</div>
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card w-5 h-5">
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <line x1="2" x2="22" y1="10" y2="10"/>
              </svg>
              <div className="text-gray-700 text-s py-1 ml-1 text-center">20 Cards Issued</div>
            </div>
          </div>
        </div>
        <div className="px-6 pt-2 pb-4 mb-1 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-normal py-2 px-6 rounded-lg hover:cursor-pointer shadow-blue-200 shadow-lg">
              <span className='text-s'>View Detais</span>
          </button>
        </div>
      </div>

        {/* Card 2 */}
        <div className="max-w-xs rounded-xl overflow-hidden shadow-lg grainy-gradient hover:shadow-2xl transition-shadow duration-500 relative ">
        <div className="pb-4 z-10 relative">
          <div className="flex text-md mb-4 items-center tracking-widest font-extralight justify-center">
              <span className='w-full bg-blue-100 px-6 py-2 text-center text-blue-600 text-xs'>Holiday Fund</span>
          </div>
          <div className="px-6 text-center">
            <div className="text-blue-500 text-4xl font-semibold py-2">$5,000</div>
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card w-5 h-5">
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <line x1="2" x2="22" y1="10" y2="10"/>
              </svg>
              <div className="text-gray-700 text-s py-1 ml-1 text-center">20 Cards Issued</div>
            </div>
          </div>
        </div>
        <div className="px-6 pt-2 pb-4 mb-1 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-normal py-2 px-6 rounded-lg hover:cursor-pointer shadow-blue-200 shadow-lg">
              <span className='text-s'>View Detais</span>
          </button>
        </div>
      </div>

        {/* Card 3 */}
        <div className="max-w-xs rounded-xl overflow-hidden shadow-lg grainy-gradient hover:shadow-2xl transition-shadow duration-500 relative ">
        <div className="pb-4 z-10 relative">
          <div className="flex text-md mb-4 items-center tracking-widest font-extralight justify-center">
              <span className='w-full bg-blue-100 px-6 py-2 text-center text-blue-600 text-xs'>Holiday Fund</span>
          </div>
          <div className="px-6 text-center">
            <div className="text-blue-500 text-4xl font-semibold py-2">$5,000</div>
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card w-5 h-5">
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <line x1="2" x2="22" y1="10" y2="10"/>
              </svg>
              <div className="text-gray-700 text-s py-1 ml-1 text-center">20 Cards Issued</div>
            </div>
          </div>
        </div>
        <div className="px-6 pt-2 pb-4 mb-1 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-normal py-2 px-6 rounded-lg hover:cursor-pointer shadow-blue-200 shadow-lg">
              <span className='text-s'>View Detais</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Analytics
