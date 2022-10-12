const accountsReducer = (state = [], { type, payload }) => {
    switch (type) {
      case "WEB3":
        return payload;
      default:
        return state;
    }
  };
  
  export default accountsReducer;