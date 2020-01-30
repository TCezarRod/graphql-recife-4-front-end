import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import _ from "lodash";

import { PLACES_QUERY } from "./queries";
import { DELETE_PLACE_MUTATION, UPDATE_PLACE_MUTATION } from "./mutations";
import { NEIGHBOURS_QUERY } from "../NeighboursPage/queries";

const PAGE_SIZE = 3;

function PlacesPage() {
  const [editingIndex, setEditingIndex] = useState();
  const [editingValue, setEditingValue] = useState();

  const { loading, data, fetchMore } = useQuery(PLACES_QUERY, {
    variables: {
      first: PAGE_SIZE
    }
    //, fetchPolicy: "cache-and-network"
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
              {editingIndex !== index ? (
                <>
                  {`[${id}] - ${name}`}
                  <button
                    onClick={() => {
                      setEditingIndex(index);
                      setEditingValue(name);
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={() => {
                      deletePlace({
                        variables: { id }
                        // // *** UNCOMMENT THIS BLOCK TO UPDATE QUERY ***
                        // ,update: cache => {
                        //   const { places } = cache.readQuery({
                        //     query: PLACES_QUERY,
                        //     variables: {
                        //       first: PAGE_SIZE
                        //     }
                        //   });

                        //   cache.writeQuery({
                        //     query: PLACES_QUERY,
                        //     variables: {
                        //       first: PAGE_SIZE
                        //     },
                        //     data: {
                        //       places: _.filter(
                        //         places,
                        //         ({ id: placeId }) => placeId !== id
                        //       )
                        //     }
                        //   });
                        // }
                        // // *** UNCOMMENT THIS BLOCK TO REFETCH NEIGHBOURS
                        // , refetchQueries: [{ query: NEIGHBOURS_QUERY }]
                      });

                      setEditingIndex();
                    }}
                  >
                    delete
                  </button>
                </>
              ) : (
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
        Fetch more
      </button>
    </div>
  );
}

export default PlacesPage;
