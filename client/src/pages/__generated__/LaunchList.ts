/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LaunchList
// ====================================================

export interface LaunchList_launches_launches_rocket {
  __typename: "Rocket";
  id: string;
  name: string | null;
}

export interface LaunchList_launches_launches_mission {
  __typename: "Mission";
  name: string | null;
  missionPatch: string | null;
}

export interface LaunchList_launches_launches {
  __typename: "Launch";
  id: string;
  isBooked: boolean;
  rocket: LaunchList_launches_launches_rocket | null;
  mission: LaunchList_launches_launches_mission | null;
}

export interface LaunchList_launches {
  __typename: "LaunchConnection";
  cursor: string;
  hasMore: boolean;
  launches: LaunchList_launches_launches[];
}

export interface LaunchList {
  launches: LaunchList_launches;
}

export interface LaunchListVariables {
  after?: string | null;
}
