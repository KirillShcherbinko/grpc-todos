import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {
  EStatus,
  type ITodoProto,
  type TTodo,
  type TTodoId,
  type TTodoList,
} from "./types";

const packageDefinition = protoLoader.loadSync("../proto/todo.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto: any = grpc.loadPackageDefinition(packageDefinition).todo;

const todos: TTodo[] = [
  {
    id: 1,
    title: "Сделать домашнее задание",
    description: "Математика и физика",
    status: EStatus.TO_DO,
  },
  {
    id: 2,
    title: "Купить продукты",
    description: "Молоко, хлеб, яйца",
    status: EStatus.IN_PROGRESS,
  },
  {
    id: 3,
    title: "Написать пост в блог",
    description: "",
    status: EStatus.DONE,
  },
  {
    id: 4,
    title: "Прочитать книгу",
    description: "«Чистый код» Роберт Мартин",
    status: EStatus.TO_DO,
  },
  {
    id: 5,
    title: "Убрать квартиру",
    description: "Пропылесосить и вытереть пыль",
    status: EStatus.DONE,
  },
  {
    id: 6,
    title: "Позвонить другу",
    description: "Обсудить планы на выходные",
    status: EStatus.TO_DO,
  },
];

const todoServiceImpl = {
  CreateTodo: (
    call: grpc.ServerUnaryCall<TTodo, TTodo>,
    callback: grpc.sendUnaryData<TTodo>
  ) => {
    const todo = { ...call.request, id: todos.length + 1 };
    todos.push(todo);
    callback(null, todo);
  },

  GetTodo: (
    call: grpc.ServerUnaryCall<TTodoId, TTodo>,
    callback: grpc.sendUnaryData<TTodo>
  ) => {
    const todo = todos.find((todo) => todo.id === call.request.id);
    if (todo) {
      callback(null, todo);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Task not found",
      });
    }
  },

  ListTodos: (
    _call: grpc.ServerUnaryCall<null, TTodoList>,
    callback: grpc.sendUnaryData<TTodoList>
  ) => {
    callback(null, { todos });
  },

  UpdateTodo: (
    call: grpc.ServerUnaryCall<TTodo, TTodo>,
    callback: grpc.sendUnaryData<TTodo>
  ) => {
    const index = todos.findIndex((todo) => todo.id === call.request.id);
    if (index === -1) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Task not found",
      });
      return;
    }
    todos[index] = call.request;
    callback(null, todos[index]);
  },

  DeleteTodo: (
    call: grpc.ServerUnaryCall<TTodoId, null>,
    callback: grpc.sendUnaryData<{}>
  ) => {
    const index = todos.findIndex((t) => t.id === call.request.id);
    if (index === -1) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Task not found",
      });
      return;
    }
    todos.splice(index, 1);
    callback(null, {});
  },
};

const server = new grpc.Server();
server.addService(proto.TodoService.service, todoServiceImpl);

const PORT = `0.0.0.0:${process.env.PORT}`;
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`gRPC server running at port ${port}`);
});
