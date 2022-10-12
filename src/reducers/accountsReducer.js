const accountsReducer = (state = [], { type, payload }) => {
    switch (type) {
      case "ALL_ACCOUNTS":
        return payload;
      default:
        return state;
    }
  };
  
  export default accountsReducer;