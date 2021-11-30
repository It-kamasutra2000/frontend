import { Form, Input, Button } from "antd";
import { observer } from "mobx-react-lite";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usersStore from "../../store/users_store";
import Userstore from "../../store/users_store";
import styles from "./login.module.css";
import formStyle from "../../formControl/formControl.module.css";

const Login: FC = () => {
  const [fieldValue, setFieldValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  //datas
  const emailErorr = usersStore.emailError;
  const passwordError = usersStore.passwordError;
  const isAuth = usersStore.isAuth;

  const setFieldError = usersStore.setFieldError;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.name === "email") {
      setFieldValue({ ...fieldValue, email: target.value });
    } else {
      setFieldValue({ ...fieldValue, password: target.value });
    }
  };

  const login = Userstore.login;

  const onHandleClick = () => {
    login(fieldValue.email, fieldValue.password);
  };

  return (
    <div className={styles.login}>
      <div className={styles.title}>login</div>
      <Form className={styles.form} name="login" autoComplete="off">
        <Form.Item label="Email" name="email">
          <Input onChange={onHandleChange} name={"email"} />
          <div className={formStyle.error}>{emailErorr}</div>
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password onChange={onHandleChange} name={"password"} />
          <div className={formStyle.error}>{passwordError}</div>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button onClick={onHandleClick} type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(Login);
