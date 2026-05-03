export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`/api/todos/${id}/delete`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete todo with id ${id}`);
};
