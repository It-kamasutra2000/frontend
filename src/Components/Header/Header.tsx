import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import usersStore from "../../store/users_store";
import styles from "./Header.module.css";

const Header: FC = () => {
  const history = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  //datas
  const isAuth = usersStore.isAuth;
  const userName = usersStore.userName;

  //actions
  const logout = usersStore.logout;

  const onHandleLogOut = () => {
    logout();
  };

  const goToRegistration = () => {
    history("/registration");
  };

  const goToLogin = () => {
    history("/login");
  };

  return (
    <div className={styles.header}>
      {isAuth ? (
        <>
          <div className={styles.userName}>{userName}</div>
          <Button danger onClick={onHandleLogOut}>
            logout
          </Button>
        </>
      ) : (
        <>
          {pathName.includes("login") ? (
            <Button type={"primary"} onClick={goToRegistration}>
              registration
            </Button>
          ) : (
            <Button type={"primary"} onClick={goToLogin}>
              login
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default observer(Header);
