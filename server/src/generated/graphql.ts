import { DeepPartial } from "../types";
import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Launch = {
  __typename?: "Launch";
  readonly id: Scalars["ID"];
  readonly site?: Maybe<Scalars["String"]>;
  readonly mission?: Maybe<Mission>;
  readonly rocket?: Maybe<Rocket>;
  readonly isBooked: Scalars["Boolean"];
};

/** Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type LaunchConnection = {
  __typename?: "LaunchConnection";
  readonly cursor: Scalars["String"];
  readonly hasMore: Scalars["Boolean"];
  readonly launches: ReadonlyArray<Launch>;
};

export type Mission = {
  __typename?: "Mission";
  readonly name?: Maybe<Scalars["String"]>;
  readonly missionPatch?: Maybe<Scalars["String"]>;
};

export type MissionMissionPatchArgs = {
  mission?: Maybe<Scalars["String"]>;
  size?: Maybe<PatchSize>;
};

export type Mutation = {
  __typename?: "Mutation";
  readonly bookTrips: TripUpdateResponse;
  readonly cancelTrip: TripUpdateResponse;
  readonly login?: Maybe<Scalars["String"]>;
};

export type MutationBookTripsArgs = {
  launchIds: ReadonlyArray<Maybe<Scalars["ID"]>>;
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
  readonly launches: LaunchConnection;
  readonly launch?: Maybe<Launch>;
  readonly me?: Maybe<User>;
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
  readonly id: Scalars["ID"];
  readonly name?: Maybe<Scalars["String"]>;
  readonly type?: Maybe<Scalars["String"]>;
};

export type TripUpdateResponse = {
  __typename?: "TripUpdateResponse";
  readonly success: Scalars["Boolean"];
  readonly message?: Maybe<Scalars["String"]>;
  readonly launches?: Maybe<ReadonlyArray<Maybe<Launch>>>;
};

export type User = {
  __typename?: "User";
  readonly id: Scalars["ID"];
  readonly email: Scalars["String"];
  readonly trips: ReadonlyArray<Maybe<Launch>>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<DeepPartial<Scalars["Int"]>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars["String"]>>;
  LaunchConnection: ResolverTypeWrapper<DeepPartial<LaunchConnection>>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars["Boolean"]>>;
  Launch: ResolverTypeWrapper<DeepPartial<Launch>>;
  ID: ResolverTypeWrapper<DeepPartial<Scalars["ID"]>>;
  Mission: ResolverTypeWrapper<DeepPartial<Mission>>;
  PatchSize: ResolverTypeWrapper<DeepPartial<PatchSize>>;
  Rocket: ResolverTypeWrapper<DeepPartial<Rocket>>;
  User: ResolverTypeWrapper<DeepPartial<User>>;
  Mutation: ResolverTypeWrapper<{}>;
  TripUpdateResponse: ResolverTypeWrapper<DeepPartial<TripUpdateResponse>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Int: DeepPartial<Scalars["Int"]>;
  String: DeepPartial<Scalars["String"]>;
  LaunchConnection: DeepPartial<LaunchConnection>;
  Boolean: DeepPartial<Scalars["Boolean"]>;
  Launch: DeepPartial<Launch>;
  ID: DeepPartial<Scalars["ID"]>;
  Mission: DeepPartial<Mission>;
  PatchSize: DeepPartial<PatchSize>;
  Rocket: DeepPartial<Rocket>;
  User: DeepPartial<User>;
  Mutation: {};
  TripUpdateResponse: DeepPartial<TripUpdateResponse>;
};

export type LaunchResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Launch"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  site?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  mission?: Resolver<Maybe<ResolversTypes["Mission"]>, ParentType, ContextType>;
  rocket?: Resolver<Maybe<ResolversTypes["Rocket"]>, ParentType, ContextType>;
  isBooked?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
};

export type LaunchConnectionResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["LaunchConnection"]
> = {
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  launches?: Resolver<
    ReadonlyArray<ResolversTypes["Launch"]>,
    ParentType,
    ContextType
  >;
};

export type MissionResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Mission"]
> = {
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  missionPatch?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    MissionMissionPatchArgs
  >;
};

export type MutationResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Mutation"]
> = {
  bookTrips?: Resolver<
    ResolversTypes["TripUpdateResponse"],
    ParentType,
    ContextType,
    MutationBookTripsArgs
  >;
  cancelTrip?: Resolver<
    ResolversTypes["TripUpdateResponse"],
    ParentType,
    ContextType,
    MutationCancelTripArgs
  >;
  login?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    MutationLoginArgs
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Query"]
> = {
  launches?: Resolver<
    ResolversTypes["LaunchConnection"],
    ParentType,
    ContextType,
    QueryLaunchesArgs
  >;
  launch?: Resolver<
    Maybe<ResolversTypes["Launch"]>,
    ParentType,
    ContextType,
    QueryLaunchArgs
  >;
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
};

export type RocketResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Rocket"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
};

export type TripUpdateResponseResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["TripUpdateResponse"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  launches?: Resolver<
    Maybe<ReadonlyArray<Maybe<ResolversTypes["Launch"]>>>,
    ParentType,
    ContextType
  >;
};

export type UserResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  trips?: Resolver<
    ReadonlyArray<Maybe<ResolversTypes["Launch"]>>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Launch?: LaunchResolvers<ContextType>;
  LaunchConnection?: LaunchConnectionResolvers<ContextType>;
  Mission?: MissionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rocket?: RocketResolvers<ContextType>;
  TripUpdateResponse?: TripUpdateResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
