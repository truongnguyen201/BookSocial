import React from "react";
import AvatarIcon from "../../img/profile.svg";
import followIcon from "../../img/follow.svg";
import followedIcon from "../../img/followed.svg";
import follow from "../../components/Queries/follow";
import unfollow from "../../components/Queries/unfollow";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import {
  getUserFollowers,
  getUserFollowing,
} from "../../components/Queries/getUserProfile";
import { GetMainUserProfile } from "../../redux/actions";

const MainInfo = (props) => {
  const { username, UserID } = props;
  const userProfile = useSelector((state) => state.UserProfile);
  var followingState;
  const dispatch = useDispatch();
  const searchFollowing = (otherid, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (otherid === myArray[i]._id) {
        return (followingState = true);
      }
    }
    return (followingState = false);
  };

  searchFollowing(UserID, userProfile.user.FollowingList);

  const [Follow] = useMutation(follow, {
    onCompleted() {
      dispatch(
        GetMainUserProfile(localStorage.getItem("token"), userProfile.user._id)
      );
    },
  });
  const [UnFollow] = useMutation(unfollow, {
    onCompleted() {
      dispatch(
        GetMainUserProfile(localStorage.getItem("token"), userProfile.user._id)
      );
    },
  });

  const changeFollow = () => {
    return () => {
      if (followingState) {
        UnFollow({
          variables: {
            userID: userProfile.user._id,
            unFollowid: UserID,
          },
          refetchQueries: [
            {
              query: getUserFollowers,
              variables: { _id: userProfile.user._id },
            },
            {
              query: getUserFollowing,
              variables: { _id: userProfile.user._id },
            },
          ],
        });
      } else {
        Follow({
          variables: {
            userID: userProfile.user._id,
            followingid: UserID,
          },
          refetchQueries: [
            {
              query: getUserFollowers,
              variables: { _id: userProfile.user._id },
            },
            {
              query: getUserFollowing,
              variables: { _id: userProfile.user._id },
            },
          ],
        });
      }
    };
  };

  return (
    <div className="MainInfo">
      <div className="Avatar">
        <img src={AvatarIcon} alt="avatar"></img>
      </div>
      <div className="UserName" style={{ display: "flex" }}>
        <div className="text">{username}</div>
        {userProfile.user._id !== UserID && (
          <div
            className={followingState ? "following" : "follow"}
            onClick={changeFollow()}
          >
            <img
              src={followingState ? followedIcon : followIcon}
              height="30px"
              width="30px"
              alt="icon"
            ></img>
            {followingState ? "Following" : "Follow"}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainInfo;
