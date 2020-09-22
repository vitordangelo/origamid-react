import React, { useState, useEffect } from "react";
import useForm from "../../../Hooks/useForm";
import useFetch from "../../../Hooks/useFetch";
import Input from "../../Forms/Input/Input";
import Button from "../../Forms/Button/Button";
import { PASSWORD_RESET } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import Error from "../../UI/Error/Error";

const LoginPasswordReset = () => {
  const [login, setLogin] = useState("");
  const [key, setKey] = useState("");
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.validate) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title">Resete a Senha</h1>
      <Input label="Nova Senha" type="password" name="password" {...password} />
      {loading ? (
        <Button disabled>Resetando...</Button>
      ) : (
        <Button>Resetar</Button>
      )}
      <Error error={error} />
    </form>
  );
};

export default LoginPasswordReset;
