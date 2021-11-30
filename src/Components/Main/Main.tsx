import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postsStore from "../../store/posts_store";

import usersStore from "../../store/users_store";
import PostForm from "../PostForm/PostForm";
import PostsListe from "../Posts/Posts";

const Main: FC = () => {
  const navigate = useNavigate();
  const getPosts = postsStore.getPosts;

  const isAuth = usersStore.isAuth;
  const error = postsStore.error;

  useEffect(() => {
    if (!isAuth) {
      console.log("FDDF");
      navigate("/login");
    }
  }, [isAuth]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <PostForm />
      <PostsListe />
    </>
  );
};

export default observer(Main);
