const { gql } = require("apollo-server");

const typeDefs = gql`
  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type Mutation {
    # If false, booking trips failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(cancelId: ID!): TripUpdateResponse!

    login(email: String): String # login token
  }

  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    # Queries for the current user
    me: User
  }
`;

module.exports = typeDefs;
