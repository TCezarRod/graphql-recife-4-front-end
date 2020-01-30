import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import { NEIGHBOURS_QUERY } from "./queries";

function NeighboursPage() {
  const { loading, data } = useQuery(NEIGHBOURS_QUERY);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">Back to Places</Link>
      <ul>
        {data.places.map(({ id, name, neighbours }) => {
          return (
            <div key={id} style={{ marginBottom: `8px` }}>
              <li>{`[${id}] - ${name}`}</li>
              <ul>
                {neighbours.map(
                  ({ id: neighbourId, name: neighbourName }, index) => (
                    <li
                      key={`${neighbourId}-${index}`}
                    >{`[${neighbourId}] - ${neighbourName}`}</li>
                  )
                )}
              </ul>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default NeighboursPage;
