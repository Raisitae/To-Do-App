const initialState = {
  tasks: [],
  isLoading: false,
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
