import { DateAction } from "../types/actionTypes";
import { SET_DATE } from "../actions/constant";

const date = (state = {}, action: DateAction) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DATE:
      const { date } = payload;
      return { ...state, date };
    default:
      return state;
  }
};

export default date;
