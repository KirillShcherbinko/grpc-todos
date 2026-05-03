import { TTodoId } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "./queries";

export const useDeleteTodo = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-todo", id],
    mutationFn: () => deleteTodo(id),
    onSuccess: (_newData) => {
      queryClient.invalidateQueries({ queryKey: ["todo-list"] });
    },
  });
};
