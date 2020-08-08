export const login = () => {
  return {
    type: "LOG IN",
  };
};
export const logout = () => {
  return {
    type: "LOG OUT",
  };
};

export const responseAction = (response) => {
  return {
    type: "RESPONSE",
    response: response,
  };
};

export default { login, logout, responseAction };
