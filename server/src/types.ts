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
  CreateTask: grpc.handleUnaryCall<TTodo, TTodo>;
  GetTask: grpc.handleUnaryCall<TTodoId, TTodo>;
  ListTasks: grpc.handleUnaryCall<{}, TTodoList>;
  UpdateTask: grpc.handleUnaryCall<TTodo, TTodo>;
  DeleteTask: grpc.handleUnaryCall<TTodoId, {}>;
}

export interface ITodoProto {
  TodoService: grpc.ServiceDefinition<ITodoService>;
}
