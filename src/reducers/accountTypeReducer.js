const accountsReducer = (state = -1, { type, payload }) => {
    switch (type) {
      case "ACCOUNT_TYPE":
        return payload;
      default:
        return state;
    }
  };
  
  export default accountsReducer;