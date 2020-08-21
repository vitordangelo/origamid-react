import React from "react";

const Error = ({error}) => {
  if (!error) return null;
  return (
    <div>
      <p style={{ color: "#f31", margin: "1rem 0" }}>{error}</p>
    </div>
  );
};

export default Error;
