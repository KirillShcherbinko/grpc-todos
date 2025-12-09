import { todoService } from "@/lib/grpc/todo-service";

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const result = await todoService.UpdateTodo(body);
    return Response.json(result);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Не удалось обновить задачу" }),
      {
        status: 500,
      }
    );
  }
};
