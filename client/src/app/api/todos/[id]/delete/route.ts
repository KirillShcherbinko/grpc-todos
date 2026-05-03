import { todoService } from "@/lib/grpc/todo-service";

export const DELETE = async (
  _req: Request,
  context: { params: { id: string } }
) => {
  try {
    const { id: idStr } = await context.params; // распаковываем Promise
    const id = Number(idStr);
    
    await todoService.DeleteTodo(id);

    return new Response(null, { status: 204 });
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Не удалось удалить задачу" }),
      { status: 500 }
    );
  }
};
