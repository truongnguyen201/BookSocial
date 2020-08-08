const Post = require("../model/Post");
const Author = require("../model/Author");
const Genre = require("../model/Genre");
const Auth = require("../model/Auth");
const graphql = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError,
} = graphql;

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
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
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
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
    id: { type: GraphQLID },
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
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    fullname: { type: GraphQLString },
  }),
});

const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    username: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: PostType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve(parent, args, context) {
        if (!context.auth) return new GraphQLError("You haven't loggin yet");
        return Post.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve(parent, args, context) {
        if (!context.auth) return new GraphQLError("You haven't loggin yet");
        return Author.findById(args.id);
      },
    },
    genre: {
      type: GenreType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve(parent, args, context) {
        if (!context.auth) return new GraphQLError("You haven't loggin yet");
        return Genre.findById(args.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(parent, args, context) {
        if (!context.auth) return new GraphQLError("You haven't loggin yet");
        return Post.find({});
      },
    },
  },
});

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
      },
      resolve(parent, args, context) {
        if (!context.auth) return new GraphQLError("You haven't loggin yet");
        let post = new Post({
          Booktitle: args.Booktitle,
          Review: args.Review,
          Recommendation: args.Recommendation,
          authorID: args.authorID,
          genreID: args.genreID,
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
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(args.password, salt);
        let auth = new Auth({
          email: args.email,
          username: args.username,
          fullname: args.fullname,
          password: hashPassword,
        });
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

        return { username: user.username, token: token };
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
