import { gql } from "apollo-boost";

export const DELETE_PLACE_MUTATION = gql`
  mutation DeletePlace($id: ID!) {
    deletePlace(id: $id)
  }
`;

export const UPDATE_PLACE_MUTATION = gql`
  mutation UpdatePlace($id: ID!, $place: PlaceInput!) {
    updatePlace(id: $id, place: $place) {
      # id
      name
    }
  }
`;
