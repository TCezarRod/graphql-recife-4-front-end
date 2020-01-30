import { gql } from "apollo-boost";

export const PLACES_QUERY = gql`
  query Places($first: Int!, $offset: Int) {
    places(first: $first, offset: $offset) {
      id
      name
      address {
        streetName
        city
      }
    }
  }
`;
