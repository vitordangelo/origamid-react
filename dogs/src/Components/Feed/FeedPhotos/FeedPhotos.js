import React, { useEffect } from "react";

import useFetch from "../../../Hooks/useFetch";

import FeedPhotosItem from "../FeedPhotosItem/FeedPhotosItem";
import Error from "../../UI/Error/Error";
import Loading from "../../UI/Loading/Loading";

import { PHOTOS_GET } from "../../../api/api";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({ page, user, setModalPhoto, setInfinite }) => {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const total = 6;
    const fetchPhotos = async () => {
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);

      if (response && response.ok && json.length < total) {
        setInfinite(false);
      }
    };
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  if (data) {
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  } else return null;
};

export default FeedPhotos;
