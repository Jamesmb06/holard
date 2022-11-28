import { userTypes } from "../types/userTypes";

//*-------------------------------------------------------------------------------------------------------------------
// esta parte igual la hicimos en sesión de dudas y a parte añadí el Logout_User
export const userReducers = (state = {}, action) => {
  switch (action.type) {

        // parte para iniciar sesión con el celular 
    case userTypes.PHONELOGIN_USER:
      return {
        ...action.payload
      }
    // la verificación  
    case userTypes.AUTHENTICATION_USER:
      return {
        ...state,
        authentication: true
      }
    // actualizar los datos 
    case userTypes.CREATE_USER:
      return {
        ...state,
        ...action.payload
      };
    // parte login, cuando estoy aunenticado me lleva a home  
    case userTypes.LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      };
    // en el crud de paletas  
    case userTypes.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
