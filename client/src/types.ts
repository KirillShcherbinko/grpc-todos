import grpc from "@grpc/grpc-js";

export enum EStatus {
  TO_DO = 0,
  IN_PROGRESS = 1,
  DONE = 2,
}

export type TTodo = {
  id: number;
  title: string;
  description: string;
  status: EStatus;
};

export type TTodoId = {
  id: number;
};

export type TTodoList = {
  todos: TTodo[];
};

interface ITodoService extends grpc.UntypedServiceImplementation {
  CreateTodo: grpc.handleUnaryCall<TTodo, TTodo>;
  GetTodo: grpc.handleUnaryCall<TTodoId, TTodo>;
  ListTodos: grpc.handleUnaryCall<{}, TTodoList>;
  UpdateTodo: grpc.handleUnaryCall<TTodo, TTodo>;
  DeleteTodo: grpc.handleUnaryCall<TTodoId, {}>;
}

export interface ITodoProto {
  TodoService: grpc.ServiceDefinition<ITodoService>;
}
