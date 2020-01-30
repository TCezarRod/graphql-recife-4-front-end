import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

import "./App.css";

const NEIGHBOURS_QUERY = gql`
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

function NeighboursPage() {
  const { loading, data } = useQuery(NEIGHBOURS_QUERY);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">Back to Places</Link>
      <ul>
        {data.places.map(({ id, name, neighbours }) => {
          return (
            <>
              <li key={id}>{name}</li>
              <ul>
                {neighbours.map(({ id: neighbourId, name: neighbourName }) => (
                  <li key={neighbourId}>{neighbourName}</li>
                ))}
              </ul>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default NeighboursPage;
