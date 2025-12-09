import { todoService } from "@/lib/grpc/todo-service";

export const POST = async (req: Request) => {
  const body = await req.json();
  const result = await todoService.CreateTodo(body);
  return Response.json(result);
}