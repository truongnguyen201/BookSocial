const GetMainUserProfile = (state = {}, action) => {
  switch (action.type) {
    case "GET USER PROFILE":
      return (state = action.data);
    case "FAIL TO GET USER PROFILE":
      return (state = action.err);
    default:
      return state;
  }
};

export default GetMainUserProfile;
