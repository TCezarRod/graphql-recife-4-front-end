import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

import "./App.css";

const NEIGHBOURS_QUERY = gql`
  query Neighbours($first: Int!) {
    places(first: $first) {
      id
      name
      neighbours {
        id
        name
      }
    }
  }
`;

function NeighboursPage() {
  const { loading, data } = useQuery(NEIGHBOURS_QUERY, {
    variables: {
      first: 3
    }
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">Places</Link>
      <ul>
        {data.places.map(({ id, name, neighbours }) => {
          return (
            <div>
              <li key={id}>{name}</li>
              <ul>
                {neighbours.map(({ id: neighbourId, name: neighbourName }) => (
                  <li key={neighbourId}>{neighbourName}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default NeighboursPage;
