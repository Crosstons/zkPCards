import React, {useState, useEffect} from 'react'
import './pool.css'
import { ethers, parseEther } from "ethers";
import debitFactoryABI from '../../../contracts/abi/Debit Card/DCFactory.sol/DCFactory.json';
import debitCardABI from '../../../contracts/abi/Debit Card/DebitCard.sol/DebitCard.json';
import { Link } from 'react-router-dom';

function Dpools() {

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const [pools, setPools] = useState([]);
  const [rotation, setRotation] = useState(0);

  // ... existing useState and useEffect ...

  const handleRefreshClick = () => {
    setRotation(prevRotation => prevRotation + 180); // Increase rotation by 180 degrees on each click
    // Add refresh logic here
  };

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
      const ch_Id = window.ethereum.chainId;
      let temp_pools = [];
      let _res;
      console.log(ch_Id);
      if(ch_Id == "0x5a2") {
        const dcFactoryZk = new ethers.Contract(ethers.getAddress("0x22A54db409c4c1244039178Ac2D4f5082b05daDE"), debitFactoryABI.abi, ethprovider);
        _res = await dcFactoryZk.getCardsIssued(_signer.address);
      } else {
        const dcFactorySep = new ethers.Contract(ethers.getAddress("0xC835983E73F5458c1D158B274CeECcB4584Fef18"), debitFactoryABI.abi, ethprovider);
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
        <div className='flex justify-between items-center mb-6 -ml-20 xl:ml-0'>
              <div className=""></div>
        <h1 className='text-3xl font-semibold'>
          Debit Card Pools
        </h1>
        <div className="p-2 bg-blue-100 rounded-md">
        <svg onClick={handleRefreshClick} style={{ transform: `rotate(${rotation}deg)` }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw cursor-pointer hover:text-blue-600 text-blue-500 transition-transform duration-300">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
          <path d="M8 16H3v5"/>
        </svg>
        </div>
      </div>
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
