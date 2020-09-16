import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api/api";
import Error from "../UI/Error/Error";
import Loading from "../UI/Loading/Loading";
import PhotoContent from "./PhotoContent/PhotoContent";

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(id);
    request(url, options);
  }, [request, id]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <section className="container mainContainer">
        <PhotoContent single={true} data={data} />
      </section>
    );
  } else return null;
};

export default Photo;
