import { todoService } from "@/lib/grpc/todo-service";

export const PUT = async (req: Request) => {
  const body = await req.json();
  const result = await todoService.UpdateTodo(body);
  return Response.json(result);
}