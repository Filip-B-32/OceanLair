export const chatActions = {
  SET_CHOSEN_CHAT_DETAILS: "CHAT.SET_CHOSEN_CHAT_DETAILS",
  SET_MESSAGES: "CHAT.SET_MESSAGES",
  SET_CHAT_TYPE: "CHAT.SET_CHAT_TYPE",
};

export const getChatActions = (dispatch) => {
  return {
    setChosenChatDetails: (details) => dispatch(setChosenChatDetails(details)),
  };
};

export const setChosenChatDetails = (chatDetails) => {
  return {
    type: chatActions.SET_CHOSEN_CHAT_DETAILS,
    chatDetails,
  };
};

export const setMessages = (messages) => {
  return {
    type: chatActions.SET_MESSAGES,
    messages,
  };
};
