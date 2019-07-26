module.exports = {
  Query: {
    launches: (_parent, _args, { dataSources }) =>
      dataSources.launchAPI.getAllLaunches(),
    launch: (_parent, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: (_parent, _args, { dataSources }) =>
      dataSources.userAPI.findOrCreateUser()
  }
};
