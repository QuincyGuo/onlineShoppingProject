import { v4 as uuidv4 } from "uuid";

// 对外暴露一个getUUID函数，返回一个在本地唯一的标识
export const getUUID = () => {
  // 先从本地存储获取uuid（看一下本地存储里面是否有）
  // uuid_token是一段固定结构的字符串，由uuid库生成，一般作为网站游客用户的唯一标识id
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  // 如果没有则生成，且本地存储
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  return uuid_token;
};
