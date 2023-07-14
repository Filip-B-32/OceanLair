import store from "../store/store";
import { setMessages } from "../store/actions/chatActions";

export const updateChatHistory = (data) => {
  const { messages } = data;

  //userId -> token
  //receiverId -> active conversation
  const userId = store.getState().auth.userDetails._id;
  const receiverId = store.getState().chat.chosenChatDetails?.id;

  if (userId && receiverId) {
    store.dispatch(setMessages(messages));
  }
};
