import { collection, doc, DocumentData, getDocs, getFirestore, limit, orderBy, query, QueryDocumentSnapshot, setDoc, where } from 'firebase/firestore';
import firebaseApp from '../firebase';
import { average } from '../utils';

const firestore = getFirestore(firebaseApp);
const notationCollection = collection(firestore,'notation');

const getNotation = async (restaurantId: string) => {
  const restaurantRef = doc(firestore,`restaurants/${restaurantId}`)
  const notationQuery = query(notationCollection, where('restaurant', "==", restaurantRef));
  const queryNotationSnapshot = await getDocs(notationQuery);
  const result: number[] = [];
  queryNotationSnapshot.docs.forEach((notation) => {
    result.push(notation.get('notation'))
  })
  return average(result);
}

const addNotation = async (restaurantId:string, newValue: number) => {
  const timestamp: string = Date.now().toString();
  const restaurantRef = doc(firestore,`restaurants/${restaurantId}`)
  const _notation = doc(firestore,`notation/${timestamp}`);
  await setDoc(_notation,{
    "notation": newValue,
    "restaurant": restaurantRef
  });
  return await getNotation(restaurantId)
}

export {getNotation, addNotation}