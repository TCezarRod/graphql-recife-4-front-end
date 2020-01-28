import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

import "./App.css";

const PLACES_QUERY = gql`
  query Places($first: Int!) {
    places(first: $first) {
      id
      name
      address {
        line1
        city
      }
    }
  }
`;

function PlacesPage() {
  const { loading, data } = useQuery(PLACES_QUERY, {
    variables: {
      first: 3
    }
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/neighbours">Neighbours</Link>
      <ul>
        {data.places.map(({ id, name, address = {} }) => {
          return (
            <li key={id}>
              {name} <br />
              <address>{`${address.line1} - ${address.city}`}</address>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PlacesPage;
