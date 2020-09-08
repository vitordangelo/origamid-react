import React, { useEffect } from "react";

import Error from "../../UI/Error/Error";
import Loading from "../../UI/Loading/Loading";
import PhotoContent from "../../Photo/PhotoContent/PhotoContent";

import useFetch from "../../../Hooks/useFetch";
import { PHOTO_GET } from "../../../api/api";

import styles from "./FeedModal.module.css";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  const handleOutsiteClick = (event) => {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  };

  return (
    <div className={styles.modal} onClick={handleOutsiteClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
