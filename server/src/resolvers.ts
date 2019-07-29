import { paginateResults } from "./utils";

import { Resolvers as IResolvers, PatchSize } from "./generated/graphql";

import { DataSources } from "./datasources";

const Resolvers: IResolvers<{ dataSources: DataSources }> = {
  Query: {
    launches: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allLaunches = await dataSources.launchAPI.getAllLaunches();

      allLaunches.reverse();

      const launches = paginateResults({
        after,
        pageSize,
        results: allLaunches
      });

      return {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false
      };
    },
    launch: (_parent, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: (_parent, _args, { dataSources }) =>
      dataSources.userAPI.findOrCreateUser()
  },

  Mutation: {
    login: async (_parent, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return Buffer.from(email).toString("base64");
    },
    bookTrips: async (
      _parent,
      { launchIds },
      { dataSources }
    ): Promise<any> => {
      const results = await dataSources.userAPI.bookTrips({ launchIds });
      const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds
      });

      return {
        success: results && results.length === launchIds.length,
        message:
          results.length === launchIds.length
            ? "trips booked successfully"
            : `the following launches couldn't be booked: ${launchIds.filter(
                id => !results.includes(id)
              )}`,
        launches
      };
    },
    cancelTrip: async (_, { launchId }, { dataSources }) => {
      const result = await dataSources.userAPI.cancelTrip({ launchId });

      if (!result)
        return {
          success: false,
          message: "failed to cancel trip"
        };

      const launch = await dataSources.launchAPI.getLaunchById({ launchId });
      return {
        success: true,
        message: "trip cancelled",
        launches: [{ ...launch, isBooked: false }]
      };
    }
  },

  Mission: {
    missionPatch: (mission: any, { size } = { size: "LARGE" as PatchSize }) => {
      return size === "SMALL"
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
    }
  },

  Launch: {
    isBooked: async (launch, _, { dataSources }) =>
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id })
  },

  User: {
    trips: async (_parent, _args, { dataSources }) => {
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

      if (!launchIds.length) return [];

      return dataSources.launchAPI.getLaunchesByIds({ launchIds }) || [];
    }
  }
};

export default Resolvers;
