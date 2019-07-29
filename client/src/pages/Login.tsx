import React from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

import { LoginUserComponent } from "../generated/graphql";
import { LoginForm, Loading } from "../components";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!) {
    login(email: $email)
  }
`;

export default function Login() {
  return (
    <ApolloConsumer>
      {client => (
        <LoginUserComponent
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
        </LoginUserComponent>
      )}
    </ApolloConsumer>
  );
}
