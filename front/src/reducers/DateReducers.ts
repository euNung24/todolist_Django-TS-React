import { SET_DATE, DateAction } from "../actions/DateActions";

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
