import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DPoolInteraction() {

  const {addr} = useParams();

  const [isIssueModalOpen, setIssueModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isDiscardModalOpen, setDiscardModalOpen] = useState(false);

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
      console.log(addr);
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
                    20
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
                    $5000
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
          { label: 'Name', type: 'text' },
          { label: 'Wallet Address', type: 'text' },
          { label: 'Limit', type: 'number' },
          { label: 'Expiration', type: 'number' }
        ]} />}
        
      {isAddModalOpen && <Modal title="Add Funds" closeModal={() => closeModal('add')} 
      fields={[
          { label: 'Amount', type: 'text' },
        ]} />}
      {isWithdrawModalOpen && <Modal title="Withdraw Funds" closeModal={() => closeModal('withdraw')} 
      fields={[
          { label: 'Amount', type: 'text' }
        ]} />}
      {isDiscardModalOpen && <Modal title="Discard Cards" closeModal={() => closeModal('discard')} selectField />}
    </div>
  );
}


function Modal({ title, closeModal, fields, selectField }) {
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
                className="block w-full px-4 py-2 mb-3 text-gray-700 border rounded-md focus:border-blue-500 focus:ring-blue-500" 
                placeholder={field.label} 
              />
            ))}
            {selectField && (
              <select className="block w-full px-4 py-2 mb-3 text-gray-700 border rounded-md focus:border-blue-500 focus:ring-blue-500">
                <option value="">Select Option</option>
                <option value="">Any</option>
              </select>
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button onClick={closeModal} className="px-4 py-2 my-1 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Submit
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