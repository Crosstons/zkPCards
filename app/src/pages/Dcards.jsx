import React, { useState } from 'react';
import Slider from 'react-slick';
import './pool.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DCards() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCardIndex(selectedCardIndex === index ? null : index);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending Card to Address:", address);
    // Implement the logic to handle the submission
  };

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
    <div className='px-5 py-6 sm:px-6 lg:px-8'>
      <h1 className='text-3xl mb-6 font-semibold text-center'>
        Debit Cards
      </h1>
        <Slider {...settings}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="px-4 flex justify-center">
              <div onClick={() => handleCardClick(i)}
                   className={`h-56 mt-4 bg-red-100 rounded-xl relative text-white shadow-md max-w-sm  ${selectedCardIndex === i ? 'ring-4 ring-green-400' : ''} cursor-pointer`}>
              <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" alt="Card Background"></img>
                <div className="w-full px-8 absolute top-8">
                  <div className="pt-2">
                    <p className="font-light pl-2 tracking-widest text-xs text-gray-300">
                        Amount
                    </p>
                    <p className="font-bold text-6xl">
                        {i === 0 ? '8888' : '00.00'}
                    </p>
                  </div>
                  <div className="pt-12 pr-6">
                    <div className="flex justify-between">
                      <div className="pl-2">
                          <p className="font-light tracking-widest text-xs text-gray-300">
                              Name
                          </p>
                          <p className="font-medium tracking-wide text-white">
                              Pool Name
                          </p>
                      </div>
                      <div>
                          <p className="font-light text-xs text-gray-300">
                              {i === 0 ? 'Valid thru' : 'Expired'}
                          </p>
                          <p className="font-medium tracking-wider text-sm">
                              {i === 0 ? '03/25' : '-/-'}
                          </p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
          ))}
        </Slider>
        <div className="mt-8">
        <h2 className="text-2xl mb-4 font-semibold text-center">
          Enter Your Address
        </h2>
        <div onSubmit={handleSubmit} className="flex flex-col items-center">
        <input type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
      </div>
  );
}

export default DCards;
