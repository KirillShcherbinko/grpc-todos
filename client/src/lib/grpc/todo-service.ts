import { TTodo, TTodoId, TTodoList } from "@/types";
import { todoClient } from "./client";
import { ServiceError } from "@grpc/grpc-js";

export const todoService = {
  CreateTodo: (data: TTodo): Promise<TTodo> =>
    new Promise((resolve, reject) => {
      todoClient.CreateTodo(data, (err: ServiceError | null, res: TTodo) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),

  GetTodo: (id: TTodoId): Promise<TTodo> =>
    new Promise((resolve, reject) => {
      todoClient.GetTodo(id, (err: ServiceError | null, res: TTodo) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),

  ListTodos: (): Promise<TTodoList> =>
    new Promise((resolve, reject) => {
      todoClient.ListTodos({}, (err: ServiceError | null, res: TTodoList) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),

  UpdateTodo: (data: TTodo): Promise<TTodo> =>
    new Promise((resolve, reject) => {
      todoClient.UpdateTodo(data, (err: ServiceError | null, res: TTodo) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),

  DeleteTodo: (id: TTodoId): Promise<{}> =>
    new Promise((resolve, reject) => {
      todoClient.DeleteTodo(id, (err: ServiceError | null) => {
        if (err) reject(err);
        else resolve({});
      });
    }),
};
