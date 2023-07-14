import { chatActions } from "../actions/chatActions";

const initState = {
  chosenChatDetails: null,
  messages: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case chatActions.SET_CHOSEN_CHAT_DETAILS:
      return {
        ...state,
        chosenChatDetails: action.chatDetails,
        messages: [],
      };

    case chatActions.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };

    default:
      return state;
  }
};

export default reducer;
