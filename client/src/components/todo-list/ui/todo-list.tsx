"use client";

import { TodoCard, TodoCardSkeleton } from "@/components/todo-card";
import { useTodos } from "../api/hooks";
import { Button, Center, Text } from "@mantine/core";
import styles from "./todo-list.module.css";

export const TodoList = () => {
  const { data, isLoading, isError, error, refetch } = useTodos();

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <TodoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Center style={{ flexDirection: "column", gap: 16 }}>
        <Text>{error.message}</Text>
        <Button onClick={() => refetch()}>Повторить</Button>
      </Center>
    );
  }

  if (!data || !data?.todos) {
    return <Text>{"Список задач пустой"}</Text>;
  }

  return (
    <div className={styles.grid}>
      {data?.todos.map((todo) => (
        <TodoCard
          key={todo.id}
          title={todo.title}
          description={todo.description}
          status={todo.status}
        />
      ))}
    </div>
  );
};
