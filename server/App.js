const express = require("express");
const app = express();
const port = 4000;
const schema = require("./schema/schema.js");
const BodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
const auth = require("./middleware/auth.js");

const uri = process.env.DB_CONNECT;
//middleware

app.use(BodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Authorization");

  next();
});
app.use(auth);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to user db");
  })
  .catch((err) => {
    console.log("DB Connection Error: " + `${err.message}`);
  });

app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    context: { auth: req.auth },
    graphiql: true,
    pretty: true,
  }))
);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
