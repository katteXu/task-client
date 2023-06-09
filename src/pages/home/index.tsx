import { useLocation } from "react-router-dom";
import { invoke } from "@tauri-apps/api";
import styles from "./style.module.less";
import { Button, Input, message } from "antd";
import { useEffect, useState } from "react";

const Index = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [id, setId] = useState<any>(0);
  const [label, setLabel] = useState("");

  useEffect(() => {
    get_data();
  }, []);

  const get_data = async () => {
    let _data: any = await invoke("get_todos");
    setData(_data);
  };

  const add_data = async () => {
    let success = await invoke("add_todo", {
      todo: {
        id,
        label,
        done: false,
        is_delete: false,
      },
    });
    if (success) {
      message.success("添加成功");
      get_data();
    } else {
      message.error("添加失败");
    }
  };
  return (
    <div className={styles.main}>
      <div>Home</div>
      <div>
        <Input
          placeholder="请输入Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          placeholder="请输入标题"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div>
        <Button onClick={get_data}>数据</Button>
        <Button onClick={add_data}>添加</Button>
      </div>
      <div>
        {data.length == 0 && <h4>暂无数据</h4>}
        {data.map((todo: any) => {
          return (
            <div key={todo.id}>
              <span>{todo.id}</span>
              <span>{todo.label}</span>
              {todo.done ? "完成" : "未完成"}
              {todo.is_delete && "已删除"}
            </div>
          );
        })}
      </div>
      <div>{location.state?.title}</div>
      <div>{location.state?.data}</div>
    </div>
  );
};

export default Index;
