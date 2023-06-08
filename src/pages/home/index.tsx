import { useLocation } from "react-router-dom";
import { invoke } from "@tauri-apps/api";
import styles from "./style.module.less";
import { Button } from "antd";
import { useState } from "react";

const Index = () => {
  const location = useLocation();
  const [data, setData] = useState("");
  const get_data = async () => {
    let _data: string = await invoke("get_data");

    setData(_data);
  };
  return (
    <div className={styles.main}>
      <div>Home</div>
      <div>
        <Button onClick={get_data}>数据</Button>
      </div>
      <div>{data}</div>
      <div>{location.state?.title}</div>
      <div>{location.state?.data}</div>
    </div>
  );
};

export default Index;
