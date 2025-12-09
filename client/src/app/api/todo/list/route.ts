import { todoService } from "@/lib/grpc/todo-service";

export const GET = async () => {
  const tasks = await todoService.ListTodos();
  return Response.json(tasks);
}
