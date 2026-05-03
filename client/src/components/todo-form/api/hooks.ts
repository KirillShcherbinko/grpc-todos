import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, fetchTodo, updateTodo } from "./queries";
import { defaultValues } from "../config/default-values";
import { TTodo } from "@/types";

export const useTodo = (id?: number) => {
  return useQuery<TTodo, Error>({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id!),
    enabled: !!id,
    initialData: id ? undefined : defaultValues,
  });
};

export const useCreateOrUpdatedTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["change-todo"],
    mutationFn: (data: TTodo) => {
      if (data.id !== 0) return updateTodo(data);
      return createTodo(data);
    },
    onSuccess: (_newData, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todo-list"] });
      if ("id" in variables) {
        queryClient.invalidateQueries({ queryKey: ["todo", variables.id] });
      }
    },
  });
};
