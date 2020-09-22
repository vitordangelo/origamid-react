import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../Forms/Input/Input";
import Button from "../../Forms/Button/Button";
import useForm from "../../../Hooks/useForm";
import { UserContext } from "../../../UserContext";
import Error from "../../UI/Error/Error";
import styles from "./LoginForm.module.css";
import stylesBtn from "../../Forms/Button/Button.module.css";
import Head from "../../../Helper/Head/Head";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, erro, loading } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Login" description="Login do site dogs" />

      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />

        {loading ? <Button>Carregando...</Button> : <Button>Entrar</Button>}
        <Error error={erro} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.subtitle}>
        <h2>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastra-se no site</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
