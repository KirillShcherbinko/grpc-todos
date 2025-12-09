import { TTodo, TTodoId, TTodoList } from "@/types";
import { todoClient } from "./client";
import Error from "next/error";
import { NextResponse } from "next/server";
import { ServiceError } from "@grpc/grpc-js";

export const todoService = {
  CreateTodo: (data: TTodo) =>
    new Promise((resolve, reject) => {
      todoClient.CreateTodo(data, (err: ServiceError, res: TTodo) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),

  GetTodo: (id: TTodoId) =>
    new Promise((resolve, reject) => {
      todoClient.GetTodo(id, (err: ServiceError, res: TTodo) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),

  ListTodos: () =>
    new Promise((resolve, reject) => {
      todoClient.ListTodos({}, (err: ServiceError, res: TTodoList) => {
        if (err) reject(err);
        else resolve(res.todos);
      });
    }),

  UpdateTodo: (data: TTodo) =>
    new Promise((resolve, reject) => {
      todoClient.UpdateTodo(data, (err: ServiceError, res: TTodo) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),

  DeleteTodo: (id: TTodoId) =>
    new Promise((resolve, reject) => {
      todoClient.DeleteTodo(id, (err: ServiceError) => {
        if (err) reject(err);
        else resolve({});
      });
    }),
};
