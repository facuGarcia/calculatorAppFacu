const recordReducer = (recordState = [], action) => {
  switch (action.type) {
    case 'ADD_TO_RECORD':
      return recordState.concat(action.payload);
    default:
      return recordState;
  }
};

export default recordReducer;
