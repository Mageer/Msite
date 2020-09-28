import { INITIAL_LOAD_DONE } from "../actions/initialLoad";

const initialState = {
  loaded: false,
};

function initialLoad(state = initialState, action) {
  switch (action.type) {
    case INITIAL_LOAD_DONE:
      return {
        ...state,
        loaded: true,
      };
    default:
      return state;
  }
}

export default initialLoad;
