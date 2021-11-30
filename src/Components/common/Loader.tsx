import { Spin } from "antd";
import { FC } from "react";
import styles from "./Loader.module.css";

const Loader: FC = () => {
  return (
    <div className={styles.spiner}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
