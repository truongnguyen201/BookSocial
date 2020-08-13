import React from "react";
import AvatarIcon from "../img/profile.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import follow from "../components/Queries/follow";
import unfollow from "../components/Queries/unfollow";
import { useMutation } from "@apollo/client";
import { getUserFollowers, getUserFollowing } from "./Queries/getUserProfile";
import { useDispatch } from "react-redux";
import { GetMainUserProfile } from "../redux/actions";

const OtherUser = (props) => {
  const { Otherusername, Otherfullname, OtherId } = props;
  const userProfile = useSelector((state) => state.UserProfile);
  const dispatch = useDispatch();
  var followingState;
  const searchFollowing = (otherid, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (otherid === myArray[i]._id) {
        return (followingState = true);
      }
    }
    return (followingState = false);
  };

  searchFollowing(OtherId, userProfile.user.FollowingList);

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
            unFollowid: OtherId,
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
            followingid: OtherId,
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
    <div className="OtherUser">
      <div className="AvatarOtherUser">
        <img src={AvatarIcon} alt="avatar" height="40px" width="40px"></img>
      </div>
      <div className="OtherUserName">
        <span>
          <Link
            to={{
              pathname: `/profile/${Otherfullname}/main`,
              state: {
                id: OtherId,
                fullname: Otherfullname,
              },
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            {Otherusername}
          </Link>
        </span>
        <div>Intro</div>
      </div>

      {localStorage.getItem("id") !== OtherId && (
        <div className="FollowPart">
          <div
            className={followingState ? "Following" : "Follow"}
            onClick={changeFollow()}
          >
            {followingState ? "Following" : "+ Follow"}
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherUser;
