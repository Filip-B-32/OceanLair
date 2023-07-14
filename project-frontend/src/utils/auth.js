export const logout = () => {
  localStorage.clear(); //clear all local storage values
  window.location.pathname = "/login"; //forward user to login page
};
