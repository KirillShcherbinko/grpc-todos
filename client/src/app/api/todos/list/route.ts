import { todoService } from "@/lib/grpc/todo-service";

export async function GET() {
  try {
    const todos = await todoService.ListTodos();
    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (err) {
    console.error((err as any).message);
    return new Response(
      JSON.stringify({ error: "Не удалось получить список задач" }),
      {
        status: 500,
      }
    );
  }
}
