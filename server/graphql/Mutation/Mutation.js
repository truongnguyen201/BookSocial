const Post = require("../../model/Post");
const Auth = require("../../model/Auth");
const User = require("../../model/User");
const ObjectId = require("mongodb").ObjectID;
const graphql = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { PostType, SignUpType, LoginType } = require("../Query/Query");

dotenv.config();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLError,
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
      resolve(parent, args, context) {
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
        });
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
          password: hashPassword,
          dateCreated: dateString,
        });

        let user = new User({
          _id: origin_id,
          username: args.username,
          fullname: args.fullname,
          followers: 0,
          following: 0,
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

        return { username: user.username, token: token, _id: user._id };
      },
    },
  },
});

module.exports = { Mutation };
