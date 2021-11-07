import * as actionTypes from "../actions/LoginActionTypes";
export const initialState = {
  user: { info: {} },
  isLogged: false,
};
export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isLogged: true,
      };
    case actionTypes.CLEAR_USER:
      return {
        ...initialState,
      };
    default:
      return { ...state };
  }
}
