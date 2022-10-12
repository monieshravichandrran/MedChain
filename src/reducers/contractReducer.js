

const initialState = { account: null, contract: null };
const contractReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CONTRACT":
      return payload;
    default:
      return state;
  }
};

export default contractReducer;