import React, {useState, useEffect} from 'react'
import './pool.css'
import { ethers, parseEther } from "ethers";
import debitFactoryABI from '../../../contracts/abi/DCFactory.json';

function Dpools() {

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();

  const dcFactoryZk = new ethers.Contract(ethers.getAddress("0xC99b9524f172146b67DF8c8ff4Af935f97Dd30c4"), debitFactoryABI.abi, signer);
  const dcFactorySep = new ethers.Contract(ethers.getAddress("0x29a795742f369C121C080488Bb46580676bC5D6f"), debitFactoryABI.abi, signer);

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
      const _res = await dcFactoryZk.getCardsIssued(_signer.address);
      console.log(_res);
    })();
  }, []);

  return (
    <div className='px-4 py-6'>
      <h1 className='text-3xl mb-6 -ml-20 xl:ml-0 font-semibold text-center '>
        Debit Card Pools
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
          <div className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-normal py-2 px-6 rounded-lg hover:cursor-pointer shadow-blue-200 shadow-lg">
              <span className='text-s'>View Detais</span>
          </div>
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

export default Dpools
