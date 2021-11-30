import { Button, Input } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { FC, useState } from "react";

import postsStore from "../../store/posts_store";
import { onHandleChangeCreator } from "../../utils/chagne_util";
import styles from "./PostForm.module.css";

const PostForm: FC = () => {
  const [fieldValue, setFieldValue] = useState<IFieldValues>({
    title: "",
    body: "",
  });

  //actions
  const createPost = postsStore.createPost;

  const onHandleChange = onHandleChangeCreator(setFieldValue, fieldValue);

  const onHandleCreatePost = async () => {
    createPost({ ...fieldValue });
    setFieldValue({ body: "", title: "" });
  };

  return (
    <div className={styles.post_form}>
      <FormItem label={"title"}>
        <Input
          onChange={onHandleChange}
          value={fieldValue.title}
          id={"title"}
          size={"large"}
          name={"title"}
          placeholder="input placeholder"
        />
      </FormItem>
      <FormItem label={"body"}>
        <Input
          onChange={onHandleChange}
          value={fieldValue.body}
          size={"large"}
          name={"body"}
          id={"body"}
          placeholder="input placeholder"
        />
      </FormItem>
      <Button
        disabled={!(fieldValue.body.trim() && fieldValue.title.trim())}
        size={"large"}
        onClick={onHandleCreatePost}
        type="primary"
      >
        create post
      </Button>
    </div>
  );
};

export default PostForm;
