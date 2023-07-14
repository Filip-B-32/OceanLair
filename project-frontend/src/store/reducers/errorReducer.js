import errorActions from "../actions/errorActions";

const initState = {
  showErrorMessage: false,
  errorMessageContent: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case errorActions.SHOW_ERROR_MESSAGE:
      return {
        ...state,
        showErrorMessage: true,
        errorMessageContent: action.content,
      };
    case errorActions.RESET_ERROR_MESSAGE:
      return {
        ...state,
        showErrorMessage: false,
        errorMessageContent: null,
      };
    default:
      return state;
  }
};

export default reducer;
