const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER'; // New action type for removing user

// Actions
export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const removeUser = () => ({
  type: REMOVE_USER, // No payload needed for removing user
});

// Initial state
const initialState = {
  profile: null,
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, profile: action.payload };
    case REMOVE_USER:
      return { ...state, profile: null }; // Clear the profile to handle user logout
    default:
      return state;
  }
};

export default userReducer;
