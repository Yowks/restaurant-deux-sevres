import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Menu from '../components/header/menu/menu';
import { useAuthContext } from '../context/AuthContext';
import { collection, DocumentData, getDocs, limit, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Restaurant from '../components/restaurant/restaurant';
import { MapComponent } from '../components/map/mapComponent';
import { RestaurantInterface } from '../interface/restaurant';

const Home: NextPage = () => {
  const [restaurants, setRestaurants] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [clickedRestaurant, setClickedRestaurant] = useState<RestaurantInterface>();
  const { user, logout } = useAuthContext();
  const router = useRouter();
  const restaurantsCollection = collection(firestore,'restaurants');

  const getRestaurants = async () => {
    const restaurantsQuery = query(restaurantsCollection,orderBy('grade'));
    const querySnapshot = await getDocs(restaurantsQuery);
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });
    setRestaurants(result);
  };

  useEffect( () => {
    getRestaurants();
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
          {/* <MapComponent {...clickedRestaurant}/> */}
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
                  <Restaurant key={index} id={restaurant.id} name={restaurant.get('name')} description={restaurant.get('description')}  image={restaurant.get('image')}  grade={restaurant.get('grade')} address={restaurant.get('address')} phoneNumber={restaurant.get('phoneNumber')}/>                )
              })
            )
          }
        </div>
      </div> 
    </div>
  );
};

export default Home;
