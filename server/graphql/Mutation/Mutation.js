const Post = require("../../model/Post");
const Auth = require("../../model/Auth");
const User = require("../../model/User");
const ObjectId = require("mongodb").ObjectID;
const graphql = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
  PostType,
  SignUpType,
  LoginType,

  actionType,
  PostCommentType,
  ReplyCommentType,
} = require("../Query/Query");

dotenv.config();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLError,
  GraphQLInt,
} = graphql;

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newPost: {
      type: PostType,
      args: {
        Booktitle: { type: new GraphQLNonNull(GraphQLString) },
        Review: { type: new GraphQLNonNull(GraphQLString) },
        Recommendation: { type: new GraphQLNonNull(GraphQLString) },
        authorID: { type: new GraphQLNonNull(GraphQLID) },
        genreID: { type: new GraphQLNonNull(GraphQLID) },
        userCreator: { type: new GraphQLNonNull(GraphQLString) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, context) {
        if (!context.auth) return new GraphQLError("You haven't loggin yet");
        var dateString = new Date();
        let post = new Post({
          Booktitle: args.Booktitle,
          Review: args.Review,
          Recommendation: args.Recommendation,
          authorID: args.authorID,
          genreID: args.genreID,
          userID: args.userID,
          userCreator: args.userCreator,
          sharesID: [],
          date: dateString,
          rateCount: 0,
          userVoted: [],
          postType: "80111115116",
        });
        const user = await User.updateOne(
          {
            _id: args.userID,
          },
          {
            $inc: {
              NumbOfPost: 1,
            },
          }
        );
        if (user.nModified !== 1) return new GraphQLError("somthing wrong");
        return post.save();
      },
    },

    createUser: {
      type: SignUpType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        fullname: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const emailExist = await Auth.findOne({ email: args.email });

        if (emailExist) {
          return new GraphQLError({ code: "auth/email-already-exist" });
        }
        var dateString = new Date();
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(args.password, salt);
        var origin_id = new ObjectId();
        let auth = new Auth({
          _id: origin_id,
          email: args.email,
          username: args.username,
          fullname: args.fullname,
          password: hashPassword,
          dateCreated: dateString,
        });

        let user = new User({
          _id: origin_id,
          NumbOfPost: 0,
          username: args.username,
          fullname: args.fullname,
          followersID: [],
          followingID: [],
        });
        user.save();
        auth.save();
        return true;
      },
    },

    login: {
      type: LoginType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args, context) {
        const user = await Auth.findOne({ email: args.email });
        const validPass = await bcrypt.compare(args.password, user.password);

        if (!user || !validPass) {
          return new GraphQLError("error email/password");
        }

        const token = jwt.sign(
          { _id: user.id, email: args.email },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "2h",
          }
        );

        return {
          username: user.username,
          fullname: user.fullname,
          token: token,
          _id: user._id,
        };
      },
    },

    follow: {
      type: actionType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
        followingid: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const state = await User.updateOne(
          { _id: args.userID },
          { $push: { followingID: args.followingid } }
        );

        const state2 = await User.updateOne(
          { _id: args.followingid },
          { $push: { followersID: args.userID } }
        );

        if (state.nModified !== 1 && state2.nModified !== 1)
          return { state: "unSuccess" };
        return { state: "success" };
      },
    },

    unfollow: {
      type: actionType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
        unFollowid: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const state = await User.updateOne(
          { _id: args.userID },
          { $pull: { followingID: args.unFollowid } }
        );

        const state2 = await User.updateOne(
          { _id: args.unFollowid },
          { $pull: { followersID: args.userID } }
        );

        if (state.nModified !== 1 && state2.nModified !== 1)
          return { state: "unSuccess" };
        return { state: "success" };
      },
    },

    addPostComment: {
      type: PostCommentType,
      args: {
        postID: { type: new GraphQLNonNull(GraphQLID) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const date = new Date();
        const post = await Post.updateOne(
          {
            _id: args.postID,
          },
          {
            $push: {
              comments: {
                rateCount: 0,
                userVoted: [],
                content: args.content,
                userID: args.userID,
                time: date,
                replyComments: [],
              },
            },
          }
        );
        if (post.nModified !== 1) return new GraphQLError("something wrong ");
        return { state: "success" };
      },
    },
    addReplyComment: {
      type: ReplyCommentType,
      args: {
        postID: { type: new GraphQLNonNull(GraphQLID) },
        postCommentID: { type: new GraphQLNonNull(GraphQLString) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const date = new Date();
        const post = await Post.updateOne(
          {
            _id: args.postID,
            "comments._id": args.postCommentID,
          },

          {
            $push: {
              "comments.$.replyComments": {
                rateCount: 0,
                userVoted: [],
                content: args.content,
                PostCommentID: args.postCommentID,
                userID: args.userID,
                time: date,
              },
            },
          }
        );

        if (post.nModified !== 1) return new GraphQLError("something wrong");
        return { state: "success" };
      },
    },
    deletePostComment: {
      type: actionType,
      args: {
        postID: { type: new GraphQLNonNull(GraphQLID) },
        postCommentID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const post = await Post.updateOne(
          { _id: args.postID },
          {
            $pull: {
              comments: {
                _id: args.postCommentID,
              },
            },
          }
        );

        if (post.nModified !== 1) return new GraphQLError("somthing wrong");
        return { state: "delete success" };
      },
    },
    deleteReplyComment: {
      type: actionType,
      args: {
        postID: { type: new GraphQLNonNull(GraphQLID) },
        postCommentID: { type: new GraphQLNonNull(GraphQLID) },
        replyCommentID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const post = await Post.updateOne(
          {
            _id: args.postID,
            "comments._id": args.postCommentID,
          },
          {
            $pull: {
              "comments.$.replyComments": {
                _id: args.replyCommentID,
              },
            },
          }
        );

        if (post.nModified !== 1) return new GraphQLError("somthing wrong");
        return { state: "delete success" };
      },
    },
    deletePost: {
      type: actionType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
        postID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        await Post.deleteOne({ _id: args.postID });
        const user = await User.updateOne(
          {
            _id: args.userID,
          },
          {
            $inc: {
              NumbOfPost: -1,
            },
          }
        );
        if (user.nModified !== 1) return new GraphQLError("somthing wrong");
        return { state: "delete success" };
      },
    },

    upVote: {
      type: actionType,
      args: {
        userID: { type: new GraphQLNonNull(GraphQLID) },
        postID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const post = await Post.updateOne(
          {
            _id: args.postID,
          },
          {
            $inc: {
              rateCount: 1,
            },
            $push: {
              userVoted: args.userID,
            },
          }
        );

        if (post.nModified !== 1) return new GraphQLError("something wrong");
        return { state: "success" };
      },
    },

    unVote: {
      type: actionType,
      args: {
        postID: { type: new GraphQLNonNull(GraphQLID) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const post = await Post.updateOne(
          {
            _id: args.postID,
          },
          {
            $inc: {
              rateCount: -1,
            },
            $pull: {
              userVoted: args.userID,
            },
          }
        );

        if (post.nModified !== 1) return new GraphQLError("something wrong");
        return { state: "success" };
      },
    },
    upVotePostComment: {
      type: actionType,
      args: {
        postCommentID: { type: new GraphQLNonNull(GraphQLID) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
        postID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const post = await Post.updateOne(
          {
            _id: args.postID,
            "comments._id": args.postCommentID,
          },
          {
            $inc: {
              "comments.$.rateCount": 1,
            },
            $push: {
              "comments.$.userVoted": args.userID,
            },
          }
        );

        if (post.nModified !== 1) return new GraphQLError("something wrong");
        return { state: "success" };
      },
    },
    unVotePostComment: {
      type: actionType,
      args: {
        postCommentID: { type: new GraphQLNonNull(GraphQLID) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
        postID: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const post = await Post.updateOne(
          {
            _id: args.postID,
            "comments._id": args.postCommentID,
          },
          {
            $inc: {
              "comments.$.rateCount": -1,
            },
            $pull: {
              "comments.$.userVoted": args.userID,
            },
          }
        );

        if (post.nModified !== 1) return new GraphQLError("something wrong");
        return { state: "success" };
      },
    },
    // upVoteReplyComment: {
    //   type: actionType,
    //   args: {
    //     postCommentID: { type: new GraphQLNonNull(GraphQLID) },
    //     userID: { type: new GraphQLNonNull(GraphQLID) },
    //     postID: { type: new GraphQLNonNull(GraphQLID) },
    //     replyCommentID: { type: new GraphQLNonNull(GraphQLID) },
    //   },
    //   async resolve(parent, args) {
    //     const post = await Post.findByIdAndUpdate(
    //       {
    //         _id: args.postID,
    //         "comments._id": args.postCommentID,
    //         "comments.replyComments._id": args.replyCommentID,
    //       },
    //       {
    //         $inc: {
    //           "comments.$.replyComments.rateCount": 1,
    //         },

    //         // $push: {
    //         //   userVoted: args.userID,
    //         // },
    //       }
    //     );

    //     console.log(post);
    //     if (post.nModified !== 1) return new GraphQLError("something wrong");
    //     return { state: "success" };
    //   },
    // },
  },
});

module.exports = { Mutation };
