import { DELETE_USER, SET_USER } from "./constant";
import { UserType } from "../types/apiTypes";

export const setUser = (userInfo: UserType) => ({
  type: SET_USER,
  payload: userInfo,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});
