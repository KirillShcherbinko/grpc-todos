"use client";

import { ActionIcon } from "@mantine/core";
import { useDeleteTodo } from "../api/hooks";
import { IconTrash } from "@tabler/icons-react";

type TDeleteButtonProps = {
  id: number;
};

export const DeleteButton = ({ id }: TDeleteButtonProps) => {
  const { isPending, mutate } = useDeleteTodo(id);

  return (
    <ActionIcon variant="transparent" onClick={() => mutate()} loading={isPending}>
      <IconTrash size={32} color="red" />
    </ActionIcon>
  );
};
