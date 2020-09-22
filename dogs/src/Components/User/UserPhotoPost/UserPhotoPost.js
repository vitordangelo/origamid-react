import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../../Hooks/useForm";
import useFetch from "../../../Hooks/useFetch";

import Input from "../../Forms/Input/Input";
import Button from "../../Forms/Button/Button";
import Error from "../../UI/Error/Error";

import styles from "./UsePhotoPost.module.css";
import { PHOTO_POST } from "../../../api/api";
import Head from "../../../Helper/Head/Head";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) navigate("/conta");
  }, [data, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  };

  const handleImgChange = ({ target }) => {
    setImg({
      raw: target.files[0],
      preview: URL.createObjectURL(target.files[0]),
    });
  };

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head
        title="Poste sua foto"
        description="Área depostar foto do site dogs"
      />

      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          type="file"
          name="img"
          id="img"
          className={styles.file}
          onChange={handleImgChange}
        />

        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}

        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
