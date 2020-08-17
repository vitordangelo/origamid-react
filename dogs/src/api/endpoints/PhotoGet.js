import React, { useState, useEffect } from "react";

const PhotoGet = () => {

  useEffect(() => {
    fetch("https://dogsapi.origamid.dev/json/api/photo/")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      });
  }, [])
  const [id, setId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://dogsapi.origamid.dev/json/api/photo/"+ id)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={({target}) => setId(target.value)} type="text"></input>
      <button>Enviar</button>
    </form>
  );
};

export default PhotoGet;
