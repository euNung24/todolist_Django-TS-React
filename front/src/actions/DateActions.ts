import { SET_DATE } from "./constant";

export const setDate = (date: string) => ({
  type: SET_DATE,
  payload: { date },
});

