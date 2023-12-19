import { TodoType } from "./src/types/apiTypes";

export function getLocalTodo(date: string): TodoType[] {
  return localStorage.getItem(date)
    ? JSON.parse(localStorage.getItem(date)!)
    : [];
}

export function setLocalTodo<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getToken() {
  return localStorage.getItem('token')
}
