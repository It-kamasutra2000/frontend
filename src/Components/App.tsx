import React, { FC, useEffect } from "react";
import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./login/login";
import Registration from "./Registration/Registration";
import Header from "./Header/Header";
import Main from "./Main/Main";
import usersStore from "../store/users_store";
import Loader from "./common/Loader";
import { observer } from "mobx-react-lite";

const App: FC = () => {
  const auth = usersStore.auth;
  const isFetching = usersStore.isAuthFetching;

  useEffect(() => {
    auth();
  }, []);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/registration"} element={<Registration />} />
        <Route path={"/"} element={<Main />} />
      </Routes>
    </div>
  );
};

export default observer(App);
