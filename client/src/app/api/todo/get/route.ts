import { todoService } from "@/lib/grpc/todo-service";

export const GET = async (req: Request) => {
  const id = await req.json();
  const task = await todoService.GetTodo(id);
  return Response.json(task);
}
