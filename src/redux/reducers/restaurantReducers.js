import { restaurantTypes } from "../types/restaurantTypes";

//*-------------------------------------------------------------------------------------------------------------------
// declaro los arrays que tengo en el firebase
const initialState = {
  restaurants: [],
  plates: [],
};

//*-------------------------------------------------------------------------------------------------------------------
// acá inicializo el estado y declaro el tipo de acción para cada cosa de lo que se va a hacer
export const restaurantReducers = (state = initialState, action) => {
  switch (action.type) {
    case restaurantTypes.GET_RESTAURANT: // me recibe el estado
      return {
        ...state,
        restaurants: action.payload.restaurants, // payload del restaurante
      };
    case restaurantTypes.ADD_RESTAURANT:
      return {
        ...state,
        restaurants: [
          ...state.restaurants,
          action.payload
        ]
      }
    case restaurantTypes.FILTER_RESTAURANT:
      return {
        ...state,
        restaurants: action.payload.restaurants,
      };
    case restaurantTypes.DETAILS_RESTAURANT:
      return {
        ...state,
        plates: action.payload.plates,
      };
    default:
      return state;
  }
};
