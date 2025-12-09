import { todoService } from "@/lib/grpc/todo-service";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const result = await todoService.CreateTodo(body);
    return Response.json(result);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Не удалось создать задачу" }),
      {
        status: 500,
      }
    );
  }
};
