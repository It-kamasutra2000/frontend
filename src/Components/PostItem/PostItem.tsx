import { Button, Card, Input } from "antd";
import { FC, useState } from "react";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";

import styles from "./PostItem.module.css";
import postsStore from "../../store/posts_store";
import { onHandleChangeCreator } from "../../utils/chagne_util";

const PostItem: FC<IPostItem> = ({ post, onHandleDeletePost }) => {
  const [editMode, setEditeMode] = useState<boolean>(false);

  const [fieldValue, setFieldValue] = useState<IFieldValues>({
    title: "",
    body: "",
  });

  const onHandleChange = onHandleChangeCreator(setFieldValue, fieldValue);

  const onHandleActiveEditeMode = () => {
    setEditeMode(true);
  };

  const onHandleDeActiveEditeMode = (id: string) => {
    setEditeMode(false);
    setFieldValue({ title: "", body: "" });
    if (fieldValue.body && fieldValue.title)
      postsStore.editePost(post._id, fieldValue.title, fieldValue.body);
  };

  return (
    <div className={styles.post} key={post._id}>
      <Card
        hoverable
        title={
          !editMode ? (
            post.title
          ) : (
            <Input
              autoFocus
              onChange={onHandleChange}
              name={"title"}
              value={fieldValue.title}
            />
          )
        }
        style={{ width: 300, height: 140 }}
      >
        <div>
          {!editMode ? (
            post.body
          ) : (
            <Input
              onChange={onHandleChange}
              name={"body"}
              value={fieldValue.body}
            />
          )}
        </div>
      </Card>
      <Button
        danger
        onClick={() => {
          onHandleDeletePost(post._id);
        }}
      >
        delete
      </Button>
      {!editMode ? (
        <div
          className={styles.edite}
          onClick={() => {
            onHandleActiveEditeMode();
          }}
        >
          <EditOutlined />
        </div>
      ) : (
        <div
          className={styles.close}
          onClick={() => {
            onHandleDeActiveEditeMode(post._id);
          }}
        >
          <CloseOutlined />
        </div>
      )}
    </div>
  );
};

export default PostItem;
