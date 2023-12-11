import React, { useState, useEffect } from 'react';
import { ethers, parseEther } from "ethers";
import { useNavigate, useParams } from 'react-router-dom';
import debitCardABI from '../../../contracts/abi/Debit Card/DebitCard.sol/DebitCard.json';

function DPoolInteraction() {

  const {addr} = useParams();

  const navigate = useNavigate();

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();

  const dcCard = new ethers.Contract(ethers.getAddress(addr), debitCardABI.abi, ethprovider);
  const [poolName, setPoolName] = useState("");
  const [poolSize, setPoolSize] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState();
  const [toAddr, setToAddr] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiration, setExpiration] = useState();
  const [cardsList, setCardsList] = useState();
  const [selectCard, setSelectedCard] = useState(0);

  const [isIssueModalOpen, setIssueModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isDiscardModalOpen, setDiscardModalOpen] = useState(false);

  const handleIssue = async () => {
    setLoading(true);
    try{
    const _dcCard = new ethers.Contract(ethers.getAddress(addr), debitCardABI.abi, signer);
    const tx = await _dcCard.issueCard(cardName, toAddr, amount, expiration);
    console.log(tx);
    await tx.wait();
    alert("Issued Card Successfully!");
    closeModal('issue');
    setLoading(false);
    navigate('/Dpools');
    } catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    }
  }

  const handleAdd = async () => {
    setLoading(true);
    try{
      const _dcCard = new ethers.Contract(ethers.getAddress(addr), debitCardABI.abi, signer);
      const tx = await _dcCard.addFundsToPool(amount, {value : amount});
      console.log(tx);
      await tx.wait();
      alert("Funds Added Successfully!");
      closeModal('add');
      setLoading(false);
      navigate('/Dpools')
    } catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    }
  }

  const handleWithdraw = async () => {
    setLoading(true);
    try{
      const _dcCard = new ethers.Contract(ethers.getAddress(addr), debitCardABI.abi, signer);
      const tx = await _dcCard.withdrawFunds(amount);
      console.log(tx);
      await tx.wait();
      alert("Funds Withdrawn Successfully!");
      closeModal('withdraw');
      setLoading(false);
      navigate('/Dpools')
    } catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    }
  }

  const handleDiscard = async () => {
    setLoading(true);
    try{
      const _dcCard = new ethers.Contract(ethers.getAddress(addr), debitCardABI.abi, signer);
      const tx = await _dcCard.discardCard(selectCard);
      console.log(tx);
      await tx.wait();
      alert("Card Discarded Successfully!");
      closeModal('discard');
      setLoading(false);
      navigate('/Dpools')
    } catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    }
  }

  const openModal = (modalType) => {
    switch(modalType) {
      case 'issue':
        setIssueModalOpen(true);
        break;
      case 'add':
        setAddModalOpen(true);
        break;
      case 'withdraw':
        setWithdrawModalOpen(true);
        break;
      case 'discard':
        setDiscardModalOpen(true);
        break;
      default:
    }
  };

  const closeModal = (modalType) => {
    switch(modalType) {
      case 'issue':
        setIssueModalOpen(false);
        break;
      case 'add':
        setAddModalOpen(false);
        break;
      case 'withdraw':
        setWithdrawModalOpen(false);
        break;
      case 'discard':
        setDiscardModalOpen(false);
        break;
      default:

    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
      const _poolName = await dcCard.poolName();
      setPoolName(_poolName);
      const _poolSize = await dcCard.poolSize();
      setPoolSize(Number(_poolSize));
      const _cardCount = await dcCard.totalSupply();
      setCardCount(Number(_cardCount));
      let _temp = [];
      let i = 0;
      while(i<_cardCount) {
        const _res = await dcCard.getCardInfo(i);
        console.log(_res);
        if(_res[4] == false) {
        _temp.push({token_id : i, name : _res[0]});
        }
        i++;
      }
      setCardsList(_temp);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="container px-4 py-6">
      <h1 className='text-3xl mb-6 -ml-20 xl:ml-0 font-semibold text-center '>
        Debit Pool Interaction
      </h1>
      <div className="flex justify-center mb-16">

      <div className="xl:w-1/3 sm:w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg grainy-gradient hover:shadow-2xl transition-shadow duration-500 relative justiy-center">
        <div className="pb-4 z-10">
          <div className="flex text-md mb-4 items-center tracking-widest font-extralight justify-center">
              <span className='w-full bg-blue-100 px-6 py-2 text-center text-blue-600 text-xs'>{loading ? "" : poolName}</span>
          </div>
          <div className="px-6 text-center">
            <div className="text-blue-500 text-4xl font-semibold py-2">${loading ? "" : poolSize}</div>
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card w-5 h-5">
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <line x1="2" x2="22" y1="10" y2="10"/>
              </svg>
              <div className="text-gray-700 text-s py-1 ml-1 text-center">{cardCount} Card/s Issued</div>
            </div>
          </div>
        </div>
        <div className="px-6 pt-2 pb-4 mb-1 flex justify-center">
          
        </div>
      </div>
      </div>

      {/* Information Table */}
      

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Interactions
                </th>
                <th scope="col" class="px-6 py-3">
                    Current Value
                </th>
                
            </tr>
        </thead>
        <tbody>
            <tr class="odd:bg-white even:bg-gray-50 ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Issue Card
                </th>
                <td class="px-6 py-4">
                    {cardCount}
                </td>
                <td class="px-6 py-4 flex justify-center">
                <button onClick={() => openModal('issue')}  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Issue</button>
                </td>
            </tr>
            <tr class="odd:bg-white even:bg-gray-50 border-b">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Add funds
                </th>
                <td class="px-6 py-4">
                    ${loading ? "" : poolSize}
                </td>
                <td class="px-6 py-4 flex justify-center">
                <button onClick={() => openModal('add')}  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Add</button>
                </td>
            </tr>
            <tr class="odd:bg-white even:bg-gray-50 border-b">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Withdraw Funds
                </th>
                <td class="px-6 py-4">
                    --
                </td>
                <td class="px-6 py-4 flex justify-center">
                <button onClick={() => openModal('withdraw')}  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Withdraw</button>
                </td>
            </tr>
            <tr class="odd:bg-white even:bg-gray-50 border-b">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Discard cards
                </th>
                <td class="px-6 py-4">
                    --
                </td>
                <td className="px-6 py-4 flex justify-center">
              <button onClick={() => openModal('discard')} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Discard</button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>

      {/* Modals */}
      {isIssueModalOpen && <Modal title="Issue Card" closeModal={() => closeModal('issue')} 
      fields={[
          { label: 'Name', type: 'text', value: cardName, update: setCardName },
          { label: 'Wallet Address', type: 'text', value: toAddr, update: setToAddr },
          { label: 'Limit', type: 'number', value: amount, update: setAmount },
          { label: 'Expiration (In Days) ', type: 'number', value: expiration, update: setExpiration }
        ]} handleFunc={handleIssue} loading={loading}/>}
        
      {isAddModalOpen && <Modal title="Add Funds" closeModal={() => closeModal('add')} 
      fields={[
          { label: 'Amount', type: 'text', value: amount, update: setAmount },
        ]} handleFunc={handleAdd} />}
      {isWithdrawModalOpen && <Modal title="Withdraw Funds" closeModal={() => closeModal('withdraw')} 
      fields={[
          { label: 'Amount', type: 'text', value: amount, update: setAmount }
        ]}  handleFunc={handleWithdraw}/>}
      {isDiscardModalOpen && <Modal title="Discard Cards" closeModal={() => closeModal('discard')} selectField={true} selectFields={cardsList} updateSelect={setSelectedCard} handleFunc={handleDiscard}/>}
    </div>
  );
}


function Modal({ title, closeModal, fields, selectField, selectFields, updateSelect, handleFunc }) {

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await handleFunc();
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <div className="mt-2 px-7 py-3">
            {fields?.map((field, index) => (
              <input 
                key={index}
                type={field.type} 
                value={field.value}
                min={field.type == 'number' ? 0 : ""}
                onChange={(e) => field.update(e.target.value)}
                className="block w-full px-4 py-2 mb-3 text-gray-700 border rounded-md focus:border-blue-500 focus:ring-blue-500" 
                placeholder={field.label} 
              />
            ))}
            {selectField && (
              <select onChange={(e) => updateSelect(e.target.value)} className="block w-full px-4 py-2 mb-3 text-gray-700 border rounded-md focus:border-blue-500 focus:ring-blue-500">
                <option value="">Select Option</option>
                {selectFields?.map((_field, _index) => (
                  <option value={_field.token_id} key={_index}>{_field.name}</option>
                ))}
              </select>
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button onClick={handleSubmit} className="px-4 py-2 my-1 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              {loading ? "Loading.." : "Submit"}
            </button>
            
            <button onClick={closeModal} className="px-4 py-2 my-1 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DPoolInteraction;