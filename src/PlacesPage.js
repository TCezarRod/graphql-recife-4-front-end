import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

import "./App.css";

const PLACES_QUERY = gql`
  query Places($first: Int!, $offset: Int!) {
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

const DELETE_PLACE_MUTATION = gql`
  mutation DeletePlace($id: ID!) {
    deletePlace(id: $id)
  }
`;

const UPDATE_PLACE_MUTATION = gql`
  mutation UpdatePlace($id: ID!, $place: PlaceInput!) {
    updatePlace(id: $id, place: $place) {
      id
      name
    }
  }
`;

const PAGE_SIZE = 3;

function PlacesPage() {
  const [editingIndex, setEditingIndex] = useState();
  const [editingValue, setEditingValue] = useState();

  const { loading, data, fetchMore } = useQuery(PLACES_QUERY, {
    variables: {
      first: PAGE_SIZE,
      offset: 0
    }
  });
  const [deletePlace] = useMutation(DELETE_PLACE_MUTATION);
  const [updatePlace] = useMutation(UPDATE_PLACE_MUTATION);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/neighbours">Go to Neighbours</Link>
      <ul>
        {data.places.map(({ id, name, address = {} }, index) => {
          return (
            <li key={id} style={{ marginBottom: `8px` }}>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editingValue}
                    onChange={event => setEditingValue(event.target.value)}
                  />
                  <button
                    onClick={() => {
                      updatePlace({
                        variables: { id, place: { name: editingValue } }
                      });
                      setEditingIndex();
                    }}
                  >
                    Confirm
                  </button>
                </>
              ) : (
                <>
                  {name}
                  <button
                    onClick={() => {
                      setEditingIndex(index);
                      setEditingValue(name);
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={() =>
                      deletePlace({
                        variables: { id },
                        update: cache => {
                          const { places } = cache.readQuery({
                            query: PLACES_QUERY,
                            variables: {
                              first: PAGE_SIZE,
                              offset: 0
                            }
                          });

                          const deletedIndex = places.findIndex(
                            ({ id: placeId }) => placeId === id
                          );

                          cache.writeQuery({
                            query: PLACES_QUERY,
                            variables: {
                              first: PAGE_SIZE,
                              offset: 0
                            },
                            data: {
                              places: places
                                .slice(0, deletedIndex)
                                .concat(
                                  places.slice(deletedIndex + 1, places.length)
                                )
                            }
                          });
                        }
                      })
                    }
                  >
                    delete
                  </button>
                </>
              )}

              <br />
              <address>{`${address.streetName} - ${address.city}`}</address>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          fetchMore({
            variables: { first: PAGE_SIZE, offset: data.places.length },
            updateQuery: (previousResult, options) => {
              return {
                places: previousResult.places.concat(
                  options.fetchMoreResult.places
                )
              };
            }
          });
        }}
      >
        Load more
      </button>
      <br />
    </div>
  );
}

export default PlacesPage;
