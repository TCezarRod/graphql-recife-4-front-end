import { gql } from "apollo-boost";

export const NEIGHBOURS_QUERY = gql`
  query Neighbours {
    places {
      id
      name
      neighbours {
        id
        name
      }
    }
  }
`;
