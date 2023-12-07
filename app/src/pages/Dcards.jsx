import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { ethers } from "ethers";
import debitFactoryABI from '../../../contracts/abi/DCFactory.json';
import debitCardABI from '../../../contracts/abi/DebitCard.json';
import './pool.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DCards() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const navigate = useNavigate();

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const [cards, setCards] = useState([]);
  const [toAddr, setAddr] = useState("");
  const [amt, setAmt] = useState();
  const [loading, setLoading] = useState(false);

  const dcFactoryZk = new ethers.Contract(ethers.getAddress("0xfaa78C9ba9502dF7f1ef58e7bFD8148cAb1774f1"), debitFactoryABI.abi, ethprovider);
  const dcFactorySep = new ethers.Contract(ethers.getAddress("0x37242118eaBA8adc7681A668D3Db50260e3cd0A8"), debitFactoryABI.abi, ethprovider);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const handleCardClick = (index) => {
    setSelectedCardIndex(selectedCardIndex === index ? null : index);
  };

  const handleSpend = async () => {
    setLoading(true);
    try{
      const _dcCard = new ethers.Contract(ethers.getAddress(cards[selectedCardIndex].token_addr), debitCardABI.abi, signer);
      const tx = await _dcCard.spendFromCard(cards[selectedCardIndex].token_id, toAddr, amt);
      console.log(tx);
      await tx.wait();
      alert("Payment Successfull");
      setLoading(false);
      navigate('/Dcards')
    } catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
      const ch_Id = window.ethereum.chainId;
      let _cards = [];
      let _res;
      if(ch_Id == "0x5a2") {
        _res = await dcFactoryZk.getCardsIssued(_signer.address);
      } else {
        _res = await dcFactorySep.getCardsIssued(_signer.address);
      }
      for(const i in _res) {
        const dcContract = new ethers.Contract(ethers.getAddress(_res[i]), debitCardABI.abi, ethprovider);
        const _poolCardsCount = await dcContract.totalSupply();
        const _poolName = await dcContract.poolName();
        let j = 0;
        while(j < Number(_poolCardsCount)) {
          const owner = await dcContract.ownerOf(j);
          if(owner == _signer.address) {
            const card_res = await dcContract.getCardInfo(j);
            if(card_res[4] != true) {
              _cards.push({token_id : j, token_addr: _res[i], name : card_res[0], issued : Number(card_res[1]), amount_left : Number(card_res[1]) - Number(card_res[2]), expiration : Number(card_res[3]), pool_name : _poolName})
            }
          }
          j = j + 1;
        }
      }
      setCards(_cards)
      console.log(_cards);
    })();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768, // Adjusts for medium screens and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        },
      },
      {
        breakpoint: 1024, // Adjusts for large screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className=''>
      <h1 className='text-3xl mb-6 font-semibold text-center'>
        Debit Cards
      </h1>
        <Slider {...settings}>
          {cards.map((_card, i) => (
            <div key={i} className="px-4 flex">
              <div onClick={() => handleCardClick(i)}
                   className={`h-56 mt-4 bg-red-100 rounded-xl relative text-white shadow-md max-w-sm  ${selectedCardIndex === i ? 'ring-4 ring-green-400' : ''} cursor-pointer`}>
              <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" alt="Card Background"></img>
                <div className="w-full px-8 absolute top-8">
                  <div className="pt-2">
                    <p className="font-light pl-2 tracking-widest text-xs text-gray-300">
                        ${_card.issued}
                    </p>
                    <p className="font-bold text-6xl">
                        ${_card.amount_left}
                    </p>
                  </div>
                  <div className="pt-12 pr-6">
                    <div className="flex justify-between">
                      <div className="pl-2">
                          <p onClick={handleFlip} className="font-light tracking-widest text-xs text-gray-300">
                              {_card.pool_name}
                          </p>
                          <p className="font-medium tracking-wide text-white">
                              {_card.name}
                          </p>
                      </div>
                      { /*
                      <div>
                          <p className="font-light text-xs text-gray-300">
                              Valid thru
                          </p>
                          <p className="font-medium tracking-wider text-sm">
                              {i === 0 ? '03/25' : '-/-'}
                          </p>
                      </div>
                      */ }
                    </div>
                  </div>
                </div>
                </div>
              </div>
          ))}
        </Slider>
        <div className="mt-8">
        <h2 className="text-2xl mb-4 font-semibold text-center">
          Enter Amount
        </h2>
        <input type="number" onChange={(e) => setAmt(e.target.value)} value={amt} min={1} id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/> 
        <h2 className="text-2xl mb-4 font-semibold text-center">
          Enter Address
        </h2>
        <div className="flex flex-col items-center">
        <input type="text" onChange={(e) => setAddr(e.target.value)} id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>  
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleSpend}
          >
            {loading ? "Loading.." : "Send"}
          </button>
        </div>
      </div>
      </div>
  );
}

export default DCards;
