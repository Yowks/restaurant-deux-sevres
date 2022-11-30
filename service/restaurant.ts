import { collection, DocumentData, getDocs, getFirestore, limit, orderBy, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import firebaseApp from '../firebase';
import { RestaurantInterface } from '../interface/restaurant';
import { getNotation } from './notation';

const firestore = getFirestore(firebaseApp);
const restaurantsCollection = collection(firestore,'restaurants');

const getRestaurants = async () => {
  const restaurantsQuery = query(restaurantsCollection);
  const querySnapshot = await getDocs(restaurantsQuery);
  const result: RestaurantInterface[] = [];
  querySnapshot.docs.forEach(async (doc) => {
    result.push({ id: doc.id, notation: await getNotation(doc.id) ,...doc.data() } as RestaurantInterface)
  })
  result.sort((a,b) => a.notation - b.notation);
  return result
};

export default getRestaurants