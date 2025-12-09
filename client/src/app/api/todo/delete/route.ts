import { todoService } from "@/lib/grpc/todo-service";

export const DELETE = async (req: Request) => {
  const body = await req.json();
  await todoService.DeleteTodo(body);
}