import LaunchAPI from "./launch";
import UserAPI from "./user";

export { LaunchAPI, UserAPI };

export interface DataSources {
  launchAPI: LaunchAPI;
  userAPI: UserAPI;
}
