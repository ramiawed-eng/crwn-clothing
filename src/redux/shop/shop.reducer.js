import ShopTypes from './shop.types';

// WITHOUT redux-thunk pattern
// const INITIAL_STATE = {
//   collections: null,
// };

// const shopReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case ShopTypes.UPDATE_COLLECTIONS:
//       return {
//         ...state,
//         collections: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// WITH redux-thunk pattern
const INITIAL_STATE = {
  collections: null,
  isFetching: false,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
        errorMesssage: undefined,
      };

    case ShopTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload,
      };

    case ShopTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMesssage: action.payload,
      };

    default:
      return state;
  }
};

export default shopReducer;
