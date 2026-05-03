import { todoService } from "@/lib/grpc/todo-service";

export const GET = async (
  _req: Request,
  context: { params: { id: string } }
) => {
  try {
    const { id: idStr } = await context.params;
    const id = Number(idStr);

    const todo = await todoService.GetTodo(id);
    return Response.json(todo);
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Не удалось получить данные задачи" }),
      {
        status: 500,
      }
    );
  }
};
