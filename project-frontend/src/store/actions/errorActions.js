const errorActions = {
  SHOW_ERROR_MESSAGE: "ERROR.SHOW_ERROR_MESSAGE",
  RESET_ERROR_MESSAGE: "ERROR.RESET_ERROR_MESSAGE",
};

export const getErrorActions = (dispatch) => {
  return {
    showErrorMessage: (content) => dispatch(showErrorMessage(content)),
  };
};

export const showErrorMessage = (content) => {
  return {
    type: errorActions.SHOW_ERROR_MESSAGE,
    content,
  };
};

export const resetErrorMessage = () => {
  return {
    type: errorActions.RESET_ERROR_MESSAGE,
  };
};

export default errorActions;
