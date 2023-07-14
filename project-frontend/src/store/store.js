import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import errorReducer from "./reducers/errorReducer";
import authReducer from "./reducers/authReducer";
import friendsListReducer from "./reducers/friendsListReducer";
import chatReducer from "./reducers/chatReducer";
import roomCallReducer from "./reducers/roomCallReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  friends: friendsListReducer,
  chat: chatReducer,
  roomCall: roomCallReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
