import React from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

import { LoginUser, LoginUserVariables } from "./__generated__/LoginUser";
import { LoginForm, Loading } from "../components";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!) {
    login(email: $email)
  }
`;

export default function Login() {
  return (
    <ApolloConsumer>
      {client => (
        <Mutation<LoginUser, LoginUserVariables>
          mutation={LOGIN_USER}
          onCompleted={({ login }) => {
            if (!login) return;
            localStorage.setItem("token", login);
            client.writeData({ data: { isLoggedIn: true } });
          }}
        >
          {(login, { loading, error }) => {
            // this loading state will probably never show, but it's helpful to
            // have for testing
            if (loading) return <Loading />;
            if (error) return <p>An error occurred</p>;

            return <LoginForm login={login} />;
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  );
}
