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

export const GetMainUserProfile = (token, userid) => {
  return (dispatch) => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: `query User($_id: ID!) {
          user(_id: $_id) {
            _id
            FollowingList {
              _id
              username
            }
            username
            fullname
          }
        }`,
        variables: { _id: userid },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        dispatch({ type: "GET USER PROFILE", data: resData.data });
      })
      .catch((err) => {
        dispatch({ type: "FAIL TO GET USER PROFILE", err: err });
      });
  };
};

export default { login, logout, GetMainUserProfile };
