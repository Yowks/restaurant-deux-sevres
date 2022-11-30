import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Menu from '../components/header/menu/menu';
import { useAuthContext } from '../context/AuthContext';
import { collection, DocumentData, getDocs, limit, orderBy, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { firestore } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Restaurant from '../components/restaurant/restaurant';
import { MapComponent } from '../components/map/mapComponent';
import { RestaurantInterface } from '../interface/restaurant';
import { average } from '../utils';
import getRestaurants from '../service/restaurant';

const Home: NextPage = () => {
  const [restaurants, setRestaurants] = useState<RestaurantInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [clickedRestaurant, setClickedRestaurant] = useState<RestaurantInterface>();
  const { user, logout } = useAuthContext();
  const router = useRouter();  

  const getAllRestaurants = async () => {
    setRestaurants(await getRestaurants());
  };

  useEffect( () => {
    getAllRestaurants();
    setTimeout( () => {
      setLoading(false);
    },2000)
  },[]);

  if (!user) {
    router.push('/login');
    return <>Go login</>;
  }

  return (
    <div>
      <Menu />
      <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
        <div className='w-full' style={{height:"250px"}}>
          <MapComponent {...clickedRestaurant}/>
        </div>
        <div className='flex flex-wrap -mx-4'>
          {
            loading ? (
              <div className='align-center'>
                <CircularProgress />
              </div>
            ): 
              restaurants.length === 0 ? (
              <div>
                <h2>Pas de restaurants</h2>
              </div>
            ) : (
              restaurants.map((restaurant, index) => {
                return (
                  <div key={index} className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4" onClick={() => setClickedRestaurant(restaurant)}>
                    <Restaurant
                      {...restaurant}
                    />   
                  </div>             
                )
              })
            )
          }
        </div>
      </div> 
    </div>
  );
};

export default Home;
