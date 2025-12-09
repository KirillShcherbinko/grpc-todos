import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./queries";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todo-list"],
    queryFn: fetchTodos,
  });
};
