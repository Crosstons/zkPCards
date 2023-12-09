import React, { useState, useEffect } from 'react';
import { ethers, parseEther } from "ethers";
import debitFactoryABI from '../../../contracts/abi/Debit Card/DCFactory.sol/DCFactory.json';
import creditFactoryABI from '../../../contracts/abi/Credit Card/Chainlink/CCFactory.sol/CCFactory.json';

function CreatePoolForm() {

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const [loading, setLoading] = useState(false);
  const [poolType, setPoolType] = useState(1);
  const [poolName, setPoolName] = useState('');
  const [poolSymbol, setPoolSymbol] = useState('');
  const [expiration, setExpiration] = useState();
  const [interest, setInterest] = useState();

  const dcFactoryZk = new ethers.Contract(ethers.getAddress("0xb00615955E64Fa925cba7E61E39C1130912117f7"), debitFactoryABI.abi, signer);
  const dcFactorySep = new ethers.Contract(ethers.getAddress("0x6995Db1E07A113F4aCf309Cd3479Fa514FDF3592"), debitFactoryABI.abi, signer);
  const ccFactorySep = new ethers.Contract(ethers.getAddress("0x4d6084E753576dc9a2422134893fECf048bF05d0"), creditFactoryABI.abi, signer);

  const handleCreate = async () => {
    setLoading(true);
    if(poolType == 1) {
      const ch_Id = window.ethereum.chainId;
      if(ch_Id == "0x5a2") {
        try{
          const _tx = await dcFactoryZk.newCardWithoutSalt(poolName, poolSymbol);
          console.log(_tx);
          await _tx.wait();
          alert("Created Debit Card Pool Successfully!");
        } catch (error) {
          console.log(error);
          alert(error);
        }
      } else {
        try{
          const _tx = await dcFactorySep.newCardWithoutSalt(poolName, poolSymbol);
          console.log(_tx);
          await _tx.wait();
          alert("Created Debit Card Pool Successfully!");
        } catch (error) {
          console.log(error);
          alert(error);
        }
      }
    } else {
      const ch_Id = window.ethereum.chainId;
      if(ch_Id == "0x5a2") {
        alert("Work In Progress For zkEVM");
        /*
        try{
          const _tx = await ccFactoryZk.newCardWithoutSalt(poolName, poolSymbol);
          console.log(_tx);
          await _tx.wait();
          alert("Created Debit Card Pool Successfully!");
        } catch (error) {
          console.log(error);
          alert(error);
        }
        */
      } else {
        try{
          const _tx = await ccFactorySep.createCreditCard(poolName, poolSymbol, "0x779877A7B0D9E8603169DdbD7836e478b4624789", "0x779877A7B0D9E8603169DdbD7836e478b4624789", expiration, interest);
          console.log(_tx);
          await _tx.wait();
          alert("Created Credit Card Pool Successfully!");
        } catch (error) {
          console.log(error);
          alert(error);
        }
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
//      console.log(window.ethereum.chainId == "0x5a2");
    })();
  }, []);

  const themeColor = poolType === 'credit' ? 'orange' : 'blue';

  return (
    <div className="container mx-auto p-6">
      <div className={`max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md transition duration-500 hover:shadow-lg ${themeColor === 'orange' ? 'border-orange-500' : 'border-blue-500'}`}>
        <h2 className="text-2xl font-semibold text-center mb-6">Create Pools</h2>
        <div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Pool Type</label>
            <select 
              value={poolType} 
              onChange={(e) => setPoolType(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${themeColor === 'orange' ? 'border-orange-500 focus:border-orange-500' : 'border-blue-500 focus:border-blue-500'}`}
            >
              <option value={1} selected>Debit Card Pool</option>
              <option value={2}>Credit Card Pool</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Pool Name</label>
            <input 
              type="text" 
              value={poolName} 
              onChange={(e) => setPoolName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${themeColor === 'orange' ? 'border-orange-500 focus:border-orange-500' : 'border-blue-500 focus:border-blue-500'}`}
              placeholder="Enter pool name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Pool Symbol</label>
            <input 
              type="text" 
              value={poolSymbol} 
              onChange={(e) => setPoolSymbol(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${themeColor === 'orange' ? 'border-orange-500 focus:border-orange-500' : 'border-blue-500 focus:border-blue-500'}`}
              placeholder="Enter pool name"
            />
          </div>

          { poolType == 2 ? 
          <>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Interest Rate</label>
            <input 
              type="number" 
              step={1}
              min={0}
              value={interest} 
              onChange={(e) => setInterest(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${themeColor === 'orange' ? 'border-orange-500 focus:border-orange-500' : 'border-blue-500 focus:border-blue-500'}`}
              placeholder="Enter pool name"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Expiration (Days)</label>
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700 text-lg">$</span>
            <input 
              type="number" 
              value={expiration} 
              min={1}
              step={1}
              onChange={(e) => setExpiration(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${themeColor === 'orange' ? 'border-orange-500 focus:border-orange-500' : 'border-blue-500 focus:border-blue-500'}`}
            />
          </div>
          </>
          : "" }

          <button onClick={handleCreate} className={`w-full py-2 px-4 rounded-lg transition duration-300 font-bold ${themeColor === 'orange' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
            { loading ? "Loading.." : "Create" }
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePoolForm;
