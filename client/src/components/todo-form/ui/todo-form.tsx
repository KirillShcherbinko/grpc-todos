"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { todoSchema } from "../../todo-card/model/schema";
import { EStatus, TTodo } from "@/types";
import {
  TextInput,
  Textarea,
  Button,
  Stack,
  NativeSelect,
} from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useCreateOrUpdatedTodo, useTodo } from "../api/hooks";
import { useEffect } from "react";
import { STATUS_NUMBER } from "../config/status-number";

export const TodoForm = () => {
  const router = useRouter();
  const { id } = useParams();

  const todoQuery = useTodo(id ? Number(id) : undefined);
  const { isPending, mutate } = useCreateOrUpdatedTodo();

  const defaultValues = todoQuery.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TTodo>({
    resolver: zodResolver(todoSchema),
    defaultValues,
  });

  const submitHandler: SubmitHandler<TTodo> = (data: TTodo) => {
    mutate(data);
    reset();
    router.push("/");
  };

  useEffect(() => {
    if (todoQuery.data) {
      reset({
        ...todoQuery.data,
        status: STATUS_NUMBER[todoQuery.data.status] as EStatus,
      });
    }
  }, [todoQuery.data, reset]);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack gap="md">
        <TextInput
          label="Название"
          placeholder="Введите название..."
          {...register("title")}
          error={errors.title?.message}
          required
        />
        <Textarea
          label="Описание"
          placeholder="Введите описание..."
          {...register("description")}
          error={errors.description?.message}
        />
        <NativeSelect
          label="Status"
          data={[
            { value: "0", label: "To do" },
            { value: "1", label: "In progress" },
            { value: "2", label: "Done" },
          ]}
          {...register("status", { valueAsNumber: true })}
          error={errors.status?.message}
        />
        <Button type="submit" loading={isPending}>
          Отправить
        </Button>
      </Stack>
    </form>
  );
};
