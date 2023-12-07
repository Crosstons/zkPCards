import React, {useState, useEffect} from 'react'
import './pool.css'
import { ethers, parseEther } from "ethers";
import debitFactoryABI from '../../../contracts/abi/DCFactory.json';
import debitCardABI from '../../../contracts/abi/DebitCard.json';
import { Link } from 'react-router-dom';

function Dpools() {

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const [pools, setPools] = useState([]);

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
      const ch_Id = window.ethereum.chainId;
      let temp_pools = [];
      let _res;
      console.log(ch_Id);
      if(ch_Id == "0x5a2") {
        const dcFactoryZk = new ethers.Contract(ethers.getAddress("0xfaa78C9ba9502dF7f1ef58e7bFD8148cAb1774f1"), debitFactoryABI.abi, ethprovider);
        _res = await dcFactoryZk.getCardsIssued(_signer.address);
      } else {
        const dcFactorySep = new ethers.Contract(ethers.getAddress("0x37242118eaBA8adc7681A668D3Db50260e3cd0A8"), debitFactoryABI.abi, ethprovider);
        _res = await dcFactorySep.getCardsIssued(_signer.address);
      }
      for(const i in _res) {
        const dcContract = new ethers.Contract(ethers.getAddress(_res[i]), debitCardABI.abi, ethprovider);
        const _poolName = await dcContract.poolName();
        const _poolSize = await dcContract.poolSize();
        const _poolCardsCount = await dcContract.totalSupply();
        temp_pools.push({name : _poolName, count: Number(_poolCardsCount), size : Number(_poolSize), addr : _res[i]});
      }
      setPools(temp_pools);
    })();
  }, []);

  return (
    <div className='px-4 py-6'>
      <h1 className='text-3xl mb-6 -ml-20 xl:ml-0 font-semibold text-center '>
        Debit Card Pools
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Display Loop Begins */}
        { pools.map(_pool => (
          <div className="max-w-xs rounded-xl overflow-hidden shadow-lg grainy-gradient hover:shadow-2xl transition-shadow duration-500 relative ">
            <div className="pb-4 z-10 relative">
              <div className="flex text-md mb-4 items-center tracking-widest font-extralight justify-center">
                  <span className='w-full bg-blue-100 px-6 py-2 text-center text-blue-600 text-xs'>{_pool.name}</span>
              </div>
              <div className="px-6 text-center">
                <div className="text-blue-500 text-4xl font-semibold py-2">${_pool.size}</div>
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card w-5 h-5">
                    <rect width="20" height="14" x="2" y="5" rx="2"/>
                    <line x1="2" x2="22" y1="10" y2="10"/>
                  </svg>
                  <div className="text-gray-700 text-s py-1 ml-1 text-center">{_pool.count} Cards</div>
                </div>
              </div>
            </div>
            <Link to={`/DPoolInteraction/${_pool.addr}`} className="px-6 pt-2 pb-4 mb-1 flex justify-center">
              <div className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-normal py-2 px-6 rounded-lg hover:cursor-pointer shadow-blue-200 shadow-lg">
                  <span className='text-s'>View Detais</span>
              </div>
            </Link>
          </div>
        ))}
        { /* Display Loop Ends */ }

      </div>
    </div>
  )
}

export default Dpools
