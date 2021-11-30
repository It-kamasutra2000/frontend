import { observer } from "mobx-react-lite";
import { FC } from "react";

import styles from "./Posts.module.css";
import postsStore from "../../store/posts_store";
import NoPosts from "../NoPosts/NoPosts";
import PostItem from "../PostItem/PostItem";
import Loader from "../common/Loader";

const PostsListe: FC = () => {
  //datas
  const isFetching = postsStore.isFetching;
  const posts = postsStore.posts;

  if (isFetching) return <Loader />;

  if (!posts.length) return <NoPosts />;

  return (
    <div className={styles.posts}>
      {posts.map((post) => {
        return <PostItem post={post} />;
      })}
    </div>
  );
};

export default observer(PostsListe);
