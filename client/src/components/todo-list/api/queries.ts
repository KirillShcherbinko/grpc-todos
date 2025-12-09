import { TTodoList } from "@/types";

export const fetchTodos = async (): Promise<TTodoList> => {
  const result = await fetch("/api/todos/list");
  if (!result.ok) throw new Error("Failed to fetch todos");
  
  const data: TTodoList = await result.json();
  return data;
};
