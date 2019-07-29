import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload promise that resolves an
   * object containing `stream`, `filename`, `mimetype` and `encoding`.
   */
  Upload: any;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type Launch = {
  __typename?: "Launch";
  id: Scalars["ID"];
  site?: Maybe<Scalars["String"]>;
  mission?: Maybe<Mission>;
  rocket?: Maybe<Rocket>;
  isBooked: Scalars["Boolean"];
};

/** Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type LaunchConnection = {
  __typename?: "LaunchConnection";
  cursor: Scalars["String"];
  hasMore: Scalars["Boolean"];
  launches: Array<Launch>;
};

export type Mission = {
  __typename?: "Mission";
  name?: Maybe<Scalars["String"]>;
  missionPatch?: Maybe<Scalars["String"]>;
};

export type MissionMissionPatchArgs = {
  mission?: Maybe<Scalars["String"]>;
  size?: Maybe<PatchSize>;
};

export type Mutation = {
  __typename?: "Mutation";
  bookTrips: TripUpdateResponse;
  cancelTrip: TripUpdateResponse;
  login?: Maybe<Scalars["String"]>;
};

export type MutationBookTripsArgs = {
  launchIds: Array<Maybe<Scalars["ID"]>>;
};

export type MutationCancelTripArgs = {
  launchId: Scalars["ID"];
};

export type MutationLoginArgs = {
  email?: Maybe<Scalars["String"]>;
};

export enum PatchSize {
  Small = "SMALL",
  Large = "LARGE"
}

export type Query = {
  __typename?: "Query";
  launches: LaunchConnection;
  launch?: Maybe<Launch>;
  me?: Maybe<User>;
};

export type QueryLaunchesArgs = {
  pageSize?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
};

export type QueryLaunchArgs = {
  id: Scalars["ID"];
};

export type Rocket = {
  __typename?: "Rocket";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type TripUpdateResponse = {
  __typename?: "TripUpdateResponse";
  success: Scalars["Boolean"];
  message?: Maybe<Scalars["String"]>;
  launches?: Maybe<Array<Maybe<Launch>>>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  trips: Array<Maybe<Launch>>;
};
export type LaunchTileFragment = { __typename?: "Launch" } & Pick<
  Launch,
  "id" | "isBooked"
> & {
    rocket: Maybe<{ __typename?: "Rocket" } & Pick<Rocket, "id" | "name">>;
    mission: Maybe<
      { __typename?: "Mission" } & Pick<Mission, "name" | "missionPatch">
    >;
  };

export type LaunchListQueryVariables = {
  after?: Maybe<Scalars["String"]>;
};

export type LaunchListQuery = { __typename?: "Query" } & {
  launches: { __typename?: "LaunchConnection" } & Pick<
    LaunchConnection,
    "cursor" | "hasMore"
  > & { launches: Array<{ __typename?: "Launch" } & LaunchTileFragment> };
};

export type LoginUserMutationVariables = {
  email: Scalars["String"];
};

export type LoginUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "login"
>;
export const LaunchTileFragmentDoc = gql`
  fragment LaunchTile on Launch {
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;
export const LaunchListDocument = gql`
  query LaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LaunchTileFragmentDoc}
`;
export type LaunchListComponentProps = Omit<
  ReactApollo.QueryProps<LaunchListQuery, LaunchListQueryVariables>,
  "query"
>;

export const LaunchListComponent = (props: LaunchListComponentProps) => (
  <ReactApollo.Query<LaunchListQuery, LaunchListQueryVariables>
    query={LaunchListDocument}
    {...props}
  />
);

export type LaunchListProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LaunchListQuery, LaunchListQueryVariables>
> &
  TChildProps;
export function withLaunchList<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LaunchListQuery,
    LaunchListQueryVariables,
    LaunchListProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    LaunchListQuery,
    LaunchListQueryVariables,
    LaunchListProps<TChildProps>
  >(LaunchListDocument, {
    alias: "withLaunchList",
    ...operationOptions
  });
}
export const LoginUserDocument = gql`
  mutation LoginUser($email: String!) {
    login(email: $email)
  }
`;
export type LoginUserMutationFn = ReactApollo.MutationFn<
  LoginUserMutation,
  LoginUserMutationVariables
>;
export type LoginUserComponentProps = Omit<
  ReactApollo.MutationProps<LoginUserMutation, LoginUserMutationVariables>,
  "mutation"
>;

export const LoginUserComponent = (props: LoginUserComponentProps) => (
  <ReactApollo.Mutation<LoginUserMutation, LoginUserMutationVariables>
    mutation={LoginUserDocument}
    {...props}
  />
);

export type LoginUserProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginUserMutation, LoginUserMutationVariables>
> &
  TChildProps;
export function withLoginUser<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginUserMutation,
    LoginUserMutationVariables,
    LoginUserProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LoginUserMutation,
    LoginUserMutationVariables,
    LoginUserProps<TChildProps>
  >(LoginUserDocument, {
    alias: "withLoginUser",
    ...operationOptions
  });
}
