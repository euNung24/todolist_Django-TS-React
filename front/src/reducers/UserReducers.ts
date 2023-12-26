import { UserAction } from "../types/actionTypes";
import { DELETE_USER, SET_USER } from "../actions/constant";

const user = (state = {}, action: UserAction) => {
  const { type } = action;
  switch (type) {
    case SET_USER:
      return { ...state, ...action.payload };
    case DELETE_USER:
      return { name: "", token: "", profileImg: "" };
    default:
      return state;
  }
};

export default user;
