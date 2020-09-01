const Post = require("../../model/Post");
const Author = require("../../model/Author");
const Genre = require("../../model/Genre");
const User = require("../../model/User");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLError,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    biography: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({ authorID: parent.id });
      },
    },
  }),
});

const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    _id: { type: GraphQLID },
    GenreTitle: { type: GraphQLString },
    Summary: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({ genreID: parent.id });
      },
    },
  }),
});

const SignUpType = new GraphQLObjectType({
  name: "SignUp",
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    fullname: { type: GraphQLString },
  }),
});

const ReplyCommentType = new GraphQLObjectType({
  name: "ReplyCommentType",
  fields: () => ({
    _id: { type: GraphQLID },
    content: { type: GraphQLString },
    userID: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userID);
      },
    },
    time: { type: GraphQLString },
    state: {
      type: GraphQLString,
    },
  }),
});

const PostCommentType = new GraphQLObjectType({
  name: "PostCommentType",
  fields: () => ({
    _id: { type: GraphQLID },
    content: { type: GraphQLString },
    userID: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userID);
      },
    },
    time: { type: GraphQLString },
    state: { type: GraphQLString },
    replyComments: {
      type: new GraphQLList(ReplyCommentType),
      resolve(parent, args) {
        return parent.replyComments;
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    _id: { type: GraphQLID },
    Booktitle: { type: GraphQLString },
    Review: { type: GraphQLString },
    Recommendation: { type: GraphQLString },
    genre: {
      type: GenreType,
      resolve(parent, args) {
        return Genre.findById(parent.genreID);
      },
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorID);
      },
    },
    userShared: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        var userShared = [];
        parent.sharesID.map((shareid) => {
          var user = User.findById(shareid);
          userShared.push(user);
        });
        return userShared;
      },
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userID);
      },
    },
    postType: {
      type: GraphQLString,
    },
    userCreator: {
      type: GraphQLString,
    },
    date: { type: GraphQLString },
    comments: { type: new GraphQLList(PostCommentType) },
    rateCount: { type: GraphQLInt },
  }),
});

const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    username: { type: GraphQLString },
    fullname: { type: GraphQLString },
    _id: { type: GraphQLID },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    fullname: { type: GraphQLString },
    FollowingList: {
      type: new GraphQLList(UserType),
      // args:{},
      resolve(parent, args) {
        var listFollowingID = [];
        parent.followingID.map((followingid) => {
          var user = User.findById(followingid);
          listFollowingID.push(user);
        });

        return listFollowingID;
      },
    },
    FollowersList: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        var listFollowersID = [];
        parent.followersID.map((followersid) => {
          var user = User.findById(followersid);
          listFollowersID.push(user);
        });

        return listFollowersID;
      },
    },
    NumbOfFollowing: {
      type: GraphQLInt,
      resolve(parent, args) {
        return parent.followingID.length;
      },
    },
    NumbOfFollowers: {
      type: GraphQLInt,
      resolve(parent, args) {
        return parent.followersID.length;
      },
    },
    NumbOfPost: {
      type: GraphQLInt,
      resolve(parent, args) {
        return parent.postsNumb;
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({ userID: parent._id });
      },
    },
  }),
});

const FollowType = new GraphQLObjectType({
  name: "FollowType",
  fields: () => ({
    state: { type: GraphQLString },
  }),
});

const UnFollowType = new GraphQLObjectType({
  name: "UnFollowType",
  fields: () => ({
    state: { type: GraphQLString },
  }),
});

const deletePost = new GraphQLObjectType({
  name: "DeletePost",
  fields: () => ({
    state: { type: GraphQLString },
  }),
});

const upVote = new GraphQLObjectType({
  name: "UpVote",
  fields: () => ({
    state: { type: GraphQLString },
  }),
});

const unVote = new GraphQLObjectType({
  name: "UnVote",
  fields: () => ({
    state: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: PostType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args, context) {
        // if (!context.auth) return new GraphQLError("You haven't loggin yet");
        return Post.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve(parent, args, context) {
        // if (!context.auth) return new GraphQLError("You haven't loggin yet");
        return Author.findById(args.id);
      },
    },
    genre: {
      type: GenreType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve(parent, args, context) {
        // if (!context.auth) return new GraphQLError("You haven't loggin yet");
        return Genre.findById(args.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(parent, args, context) {
        // if (!context.auth) return new GraphQLError("You haven't loggin yet");
        return Post.find({});
      },
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return User.findById(args._id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
  },
});

module.exports = {
  PostType,
  RootQuery,
  AuthorType,
  GenreType,
  SignUpType,
  LoginType,
  UserType,
  FollowType,
  UnFollowType,
  PostCommentType,
  ReplyCommentType,
  deletePost,
  upVote,
  unVote,
};
