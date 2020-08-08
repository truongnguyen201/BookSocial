const isLogged = (state = false, action) => {
  switch (action.type) {
    case "LOG IN":
      return (state = true);
    case "LOG OUT":
      return (state = false);
    default:
      return state;
  }
};

export default isLogged;
