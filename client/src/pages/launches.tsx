import React from "react";
import gql from "graphql-tag";
import { get } from "lodash";

import { Launch, LaunchListComponent } from "../generated/graphql";
import { LaunchTile, Header, Button, Loading } from "../components";

export const LAUNCH_TILE_DATA = gql`
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

export const GET_LAUNCHES = gql`
  query LaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Launches = () => {
  return (
    <LaunchListComponent>
      {({ data, loading, error, fetchMore }) => {
        if (loading || !data) return <Loading />;

        const launches: Launch[] = get(data, ["launches", "launches"]);

        return (
          <>
            <Header />
            {launches.map(launch => (
              <LaunchTile key={launch.id} launch={launch} />
            ))}
            {data.launches && data.launches.hasMore && (
              <Button
                onClick={() =>
                  fetchMore({
                    variables: {
                      after: data.launches.cursor
                    },
                    updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                      if (!fetchMoreResult) return prev;

                      return {
                        ...fetchMoreResult,
                        launches: {
                          ...fetchMoreResult.launches,
                          launches: [
                            ...prev.launches.launches,
                            ...fetchMoreResult.launches.launches
                          ]
                        }
                      };
                    }
                  })
                }
              >
                Load More
              </Button>
            )}
          </>
        );
      }}
    </LaunchListComponent>
  );
};

export default Launches;
