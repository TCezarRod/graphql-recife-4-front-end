import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import "./App.css";

const PLACES_QUERY = gql`
  query Places {
    places {
      id
      name
    }
  }
`;

function App() {
  const { loading, data } = useQuery(PLACES_QUERY);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {data.places.map(({ id, name }) => {
        return <li key={id}>{name}</li>;
      })}
    </ul>
  );
}

export default App;
