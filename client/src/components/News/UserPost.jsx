import React, { useState } from "react";
import AvatarIcon from "../../img/profile.svg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addNewPost } from "../Queries/addNewPost";
import { useMutation } from "@apollo/client";
import { getPostsDetail } from "../Queries/getPostDetail";
import { useSelector } from "react-redux";

const UserPost = () => {
  const [modal, setModal] = useState(false);
  const userProfile = useSelector((state) => state.UserProfile);
  const [addpost] = useMutation(addNewPost);

  let [newPost, setNewPost] = useState({
    Review: "",
    Recommendation: "",
    Booktitle: "",
    genreID: "5f07eea4f2622d7e4f0ecdab",
    authorID: "5f07ee03f2622d7e4f0ecdaa",
    userCreator: userProfile.user.username,
    userID: userProfile.user._id,
  });

  const addPost = (e) => {
    e.preventDefault();

    addpost({
      variables: {
        Review: newPost.Review,
        Recommendation: newPost.Recommendation,
        genreID: newPost.genreID,
        authorID: newPost.authorID,
        Booktitle: newPost.Booktitle,
        userCreator: newPost.userCreator,
        userID: newPost.userID,
      },
      refetchQueries: [{ query: getPostsDetail }],
    });
  };

  const toggleModal = () => setModal(!modal);
  return (
    <div className="UserPost">
      <div className="MainUserPost" onClick={toggleModal}>
        <div className="top-userpost">
          <div className="Avatar">
            <img src={AvatarIcon} alt="icon" height="30px" width="30px"></img>
          </div>
          <div className="UserName" style={{ marginLeft: "10px" }}>
            {userProfile.user.username}
          </div>
        </div>
        <div className="bottom-userpost">
          Let's review or ask some questions
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New Review</ModalHeader>{" "}
        <form onSubmit={addPost}>
          <ModalBody>
            <div className="field">
              <label>Book Title:</label>
              <input
                onChange={(e) =>
                  setNewPost({
                    Review: newPost.Review,
                    Recommendation: newPost.Recommendation,
                    genreID: newPost.genreID,
                    authorID: newPost.authorID,
                    Booktitle: e.target.value,
                    userCreator: newPost.userCreator,
                    userID: newPost.userID,
                  })
                }
              />
            </div>
            <div className="field">
              <label>Genre:</label>
              <select id="genre" name="genre">
                <option value="select genre">Select genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Literature">Literature</option>
                <option value="History">History</option>
              </select>
            </div>
            <div className="field">
              <label>Author:</label>
              <input></input>
            </div>
            <div className="field">
              <label>Recommend:</label>
              <input
                onChange={(e) =>
                  setNewPost({
                    Review: newPost.Review,
                    Recommendation: e.target.value,
                    genreID: newPost.genreID,
                    authorID: newPost.authorID,
                    Booktitle: newPost.Booktitle,
                    userCreator: newPost.userCreator,
                    userID: newPost.userID,
                  })
                }
              ></input>
            </div>
            <div className="field">
              <label>Review:</label>
              <input
                onChange={(e) =>
                  setNewPost({
                    Review: e.target.value,
                    Recommendation: newPost.Recommendation,
                    genreID: newPost.genreID,
                    authorID: newPost.authorID,
                    Booktitle: newPost.Booktitle,
                    userCreator: newPost.userCreator,
                    userID: newPost.userID,
                  })
                }
              ></input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal} type="submit">
              Post Your Review
            </Button>{" "}
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default UserPost;
