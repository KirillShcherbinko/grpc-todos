import { TTodo } from "@/types";

export const fetchTodo = async (id: number): Promise<TTodo> => {
  const result = await fetch(`/api/todos/${id}/get`);
  if (!result.ok) throw new Error("Failed to fetch todos");

  const data: TTodo = await result.json();
  return data;
};

export const createTodo = async (todo: Omit<TTodo, "id">): Promise<TTodo> => {
  const res = await fetch("/api/todos/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!res.ok) throw new Error("Не удалось создать задачу");

  return res.json();
};

export const updateTodo = async (todo: TTodo): Promise<TTodo> => {
  const res = await fetch("/api/todos/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!res.ok) throw new Error("Не удалось обновить задачу");

  return res.json();
};