import { Form, Input, Button } from "antd";
import { observer } from "mobx-react-lite";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import usersStore from "../../store/users_store";

import Userstore from "../../store/users_store";
import styles from "./Registration.module.css";
import formStyles from "../../formControl/formControl.module.css";

const Registration: FC = () => {
  const [fieldValue, setFieldValue] = useState<{
    email: string;
    password: string;
    name: string;
  }>({
    email: "",
    password: "",
    name: "",
  });

  const nameError = usersStore.nameError;
  const emailError = usersStore.emailError;
  const passwordError = usersStore.passwordError;
  const isAuth = usersStore.isAuth;
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
    } else if (target.name === "password") {
      setFieldValue({ ...fieldValue, password: target.value });
    } else {
      setFieldValue({ ...fieldValue, name: target.value });
    }
  };

  const registration = Userstore.registration;

  const onHandleClick = () => {
    registration(fieldValue.email, fieldValue.password, fieldValue.name);
  };

  return (
    <div className={styles.registration}>
      <div className={styles.title}>Registration</div>
      <Form className={styles.form} name="login" autoComplete="off">
        <Form.Item label="name" name="name">
          <Input
            onChange={onHandleChange}
            value={fieldValue.name}
            name={"name"}
          />
          <div className={formStyles.error}>{nameError}</div>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input
            onChange={onHandleChange}
            value={fieldValue.email}
            name={"email"}
          />
          <div className={formStyles.error}>{emailError}</div>
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password
            onChange={onHandleChange}
            value={fieldValue.password}
            name={"password"}
          />
          <div className={formStyles.error}>{passwordError}</div>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button onClick={onHandleClick} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(Registration);
