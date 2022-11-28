import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../../firebase/firebaseConfig";
import { restaurantTypes } from "../types/restaurantTypes";

//*-------------------------------------------------------------------------------------------------------------------
// código desarrollado en clase crud de paletas
const collectionName = "restaurants";

//*-------------------------------------------------------------------------------------------------------------------
// acción asincrona que me dispara los métodos de firebase
export const actionGetRestaurantAsync = () => {
  return async (dispatch) => {
    const restaurantsCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(restaurantsCollection);
    const restaurants = []; //array vació para luego intentar la información del push que encuentra
    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        restaurants.push({
          id: doc.id,
          ...doc.data(),
        });
        //   console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(actionGetRestaurantSync(restaurants));
    }
  };
};
//*-------------------------------------------------------------------------------------------------------------------
//acá se dispara la siguiente acción sincrona que me devuele el tipo de restaurante
const actionGetRestaurantSync = (restaurants) => {
  return {
    type: restaurantTypes.GET_RESTAURANT,
    payload: {
      restaurants: restaurants,
    },
  };
};

//*-------------------------------------------------------------------------------------------------------------------
// para añadir restaurantes función asincrona
export const actionAddRestaurantAsync = (restaurants) => {
  return async (dispatch) => {
    try {
      const restaurantsCollection = collection(dataBase, collectionName);
      const docs = await addDoc(restaurantsCollection, restaurants);
      dispatch(actionAddRestaurantSync({ id: docs.id, ...restaurants}));
    } catch (error) {
      console.log(error);
      dispatch(actionAddRestaurantSync({}));
    }
  };
};

//*-------------------------------------------------------------------------------------------------------------------
// función sincrona de añadir restaurantes
const actionAddRestaurantSync = (restaurants) => {
  return {
    type: restaurantTypes.ADD_RESTAURANT ,
    payload: restaurants,
  };
};

//*-------------------------------------------------------------------------------------------------------------------
// acción asincrona que me permite hacer filtro con los botones
export const actionFilterRestaurantAsync = (searchParam, searchValue) => { //Paran la propieda que es por Typo, y Value el valor que le tengo (tipos de comida)
    return async (dispatch) => {
      const restaurantsCollection = collection(dataBase, collectionName);
      const q = query(restaurantsCollection, where(searchParam, "==", searchValue));
      const restaurants = [];
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          restaurants.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(actionFilterRestaurantSync(restaurants));
      }
    };
  };
    //*-------------------------------------------------------------------------------------------------------------------
  //acción sincrona que me devuelve el filtrado de restaurantes
  const actionFilterRestaurantSync = (restaurants) => {
    return {
      type: restaurantTypes.FILTER_RESTAURANT,
      payload: {
        restaurants: restaurants,
      },
    };
  };

//*-------------------------------------------------------------------------------------------------------------------
  const collectionName1 = "plates";

  export const actionGetPlatesAsync = (searchParam) => {
    return async (dispatch) => {
      const platesCollection = collection(dataBase, collectionName1);
      const querySnapshot = await getDocs(platesCollection);
      const plates = [];
      try {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          plates.push({
            id: doc.id,
            ...doc.data(),
          });
          //   console.log(doc.id, " => ", doc.data());
        });
    console.log(plates)
    console.log(searchParam)
        const filterPlates = plates.filter((item) =>
          item.restaurants.toLowerCase().includes(searchParam.toLowerCase())
        );
        console.log(filterPlates);
        dispatch(actionFilterPlatesSync(filterPlates));
      } catch (error) {
        console.error(error);
        dispatch(actionFilterPlatesSync([]));
      }
    };
  };

  //*-------------------------------------------------------------------------------------------------------------------

  export const actionFilterPlatesAsync = (searchParam, searchValue) => {
    console.log(searchValue)
    console.log(searchParam)
    return async (dispatch) => {
      const platesCollection = collection(dataBase, collectionName1);
      const q = query(platesCollection, where(searchParam, "==", searchValue));
      const plates = [];
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          plates.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(actionFilterPlatesSync(plates));
      }
    }
  };

  //*-------------------------------------------------------------------------------------------------------------------

const actionFilterPlatesSync = (plates) => {
    console.log(plates)
    return {
      type: restaurantTypes.DETAILS_RESTAURANT,
      payload: {
        plates: plates,
      },
    }
  };