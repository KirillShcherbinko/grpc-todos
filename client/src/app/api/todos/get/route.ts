import { todoService } from "@/lib/grpc/todo-service";

export const GET = async (req: Request) => {
  try {
    const id = await req.json();
    const task = await todoService.GetTodo(id);
    return Response.json(task);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Не удалось получить данные задачи" }),
      {
        status: 500,
      }
    );
  }
};
