import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./Views/HomePage";
import SignInAndUp from "./Auth/SignInAndUp";
import { PrivateRoute } from "./Auth/authentication";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import ProfilePage from "./Views/ProfilePage";

function App() {
  // Get Response

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  //apollo client setup
  const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <PrivateRoute exact path="/">
            <HomePage></HomePage>
          </PrivateRoute>
          <PrivateRoute path="/profile/:username/:profiledetail">
            <ProfilePage></ProfilePage>
          </PrivateRoute>
          <Route exact path="/login" component={SignInAndUp} />
          <Route exact path="/signup" component={SignInAndUp} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
