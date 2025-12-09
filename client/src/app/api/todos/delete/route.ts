import { todoService } from "@/lib/grpc/todo-service";

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    await todoService.DeleteTodo(body);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Не удалось удалить задачу" }),
      {
        status: 500,
      }
    );
  }
};
