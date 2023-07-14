import * as api from "../../api";
import { showErrorMessage, resetErrorMessage } from "./errorActions";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    signup: (userDetails, navigate) => dispatch(signup(userDetails, navigate)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.login(userDetails);
    console.log(response);
    if (response.error) {
      //show error message in component
      dispatch(showErrorMessage(response?.exception?.response?.data));
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem("user", JSON.stringify(userDetails));

      dispatch(resetErrorMessage());
      dispatch(setUserDetails(userDetails));
      navigate("/homepage");
    }
  };
};

const signup = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.signup(userDetails);
    console.log(response);
    if (response.error) {
      //show error message in component
      dispatch(showErrorMessage(response?.exception?.response?.data));
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem("user", JSON.stringify(userDetails));

      dispatch(resetErrorMessage());
      dispatch(setUserDetails(userDetails));
      navigate("/homepage");
    }
  };
};
