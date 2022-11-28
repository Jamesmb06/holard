import { updateProfile, signInWithEmailAndPassword, updatePassword, updateEmail, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { userTypes } from "../types/userTypes";

//*-------------------------------------------------------------------------------------------------------------------
// este codigo también lo realizamos en la sesión de dudas
export const actionSignPhoneAsync = (codigo) => {
  return (dispatch) => {
    const confirmationResult = window.confirmationResult; // pura documentación, cuando la constante se confirme me va a recibir el código
    confirmationResult.confirm(codigo)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const { displayName, email, accessToken, phoneNumber, photoURL, uid } = user.auth.currentUser;
        dispatch(
          actionSignPhoneSync({ // se dispara la acción sincrona que tendra esas propiedades
            name: displayName,
            email,
            accessToken,
            phoneNumber,
            avatar: photoURL,
            uid,
            error: false
          }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          actionSignPhoneSync({ error: true, errorMessage: error.message }))
      })
  }
}

//*-------------------------------------------------------------------------------------------------------------------
// la acción sincrona simplemente me regresa el type
export const actionSignPhoneSync = (user) => {
  return {
    type: userTypes.PHONELOGIN_USER,
    payload: { ...user },
  }
}

export const actionAuthenticationSync = () => {
  return {
    type: userTypes.AUTHENTICATION_USER,
  }
}

//*-------------------------------------------------------------------------------------------------------------------
// lo hicimos en clase para la autenticación del usuario que es lo que tenemos en UserTypes
export const actionRegisterAsync = ({ email, password, name }) => {
  return async (dispatch) => {
    try {
      // métodos importados para actualizar el perfil
      await updatePassword(auth.currentUser, password);
      await updateEmail(auth.currentUser, email);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      // me dispara la acción sicnrona que me recibe esos datos
      dispatch(actionRegisterSync({ name, email, password, error: false }))
    } catch (error) {
      dispatch(actionRegisterSync({ error: true, errorMessage: error.message }))
    }
  };
};

//*-------------------------------------------------------------------------------------------------------------------
// esta acción me recibe el partialUser el type y el payload que es una copia del partialUser ( lo que reciebe arriba)
const actionRegisterSync = (partialUser) => {
  return {
    type: userTypes.CREATE_USER,
    payload: { ...partialUser },
  };
};

//*-------------------------------------------------------------------------------------------------------------------
// codigo de la clase del crud de paletas
export const actionUserLogOutAsync=()=>{ // cuando de logout me saque
  return (dispatch)=>{
    signOut(auth) // método de firebase, lo llamo y me dispara la acción sincrona de abajo
    .then(()=>{
      dispatch(actionUserLogOutSync())
    })
    .catch((error)=>{console.log(error);})
  }
}
const actionUserLogOutSync=()=>{
  return{
    type:userTypes.LOGOUT_USER,
  }
}

// al llamar el método de arriba
export const loginAsync = (email, password) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
        const user = response.user;
        dispatch(loginSync({ ...user, error: false }))
      })
      .catch((error) => {
        console.log(error)
        dispatch(loginSync({ error: true }))
      })

  }
}

const loginSync = (user) => {
  return {
    type: userTypes.LOGIN_USER,
    payload: user
  }
}