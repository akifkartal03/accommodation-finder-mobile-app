import * as actionTypes from "./LoginActionTypes";
export function setUSer(user) {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
}
export function clear() {
  return {
    type: actionTypes.CLEAR_USER,
  };
}
