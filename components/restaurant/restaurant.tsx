import { useState, useEffect } from 'react';
import { RestaurantInterface } from "../../interface/restaurant";
import Rating from '@mui/material/Rating';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import Image from 'next/image';
import { addNotation } from '../../service/notation';

const Restaurant: React.FC<RestaurantInterface> = ({name, address, notation, phoneNumber, id, image, description}) => {
  const [notationValue, setNotationValue] = useState<number>(notation);

  const addNewNotation = async (id: string, newValue: number) => {
    setNotationValue(await addNotation(id, newValue));
  }
  
  return (
    <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
      <div className="relative pb-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
          layout='fill'
        />
      </div>
      <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
        <div className="p-4">
          <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">Les mieux notés</span>
          <h2 className="mt-2 mb-2  font-bold">{name}</h2>
          <p className="text-sm">
            {description}
          </p>
        </div>
        <div className="p-4 border-t border-b text-xs text-gray-700">
          <span className="flex items-center mb-1">
            <i className="far fa-clock fa-fw mr-2 text-gray-900"></i> {phoneNumber}
          </span>
          <span className="flex items-center">
            <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i> {address}
          </span>        
        </div>
        <div className='p-4'>
          <Rating
            name="simple-controlled"
            value={notationValue}
            onChange={(event, newValue) => {
              if (newValue != null){
                addNewNotation(id, newValue);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
