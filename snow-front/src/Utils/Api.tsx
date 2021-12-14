import { Product, Unit, User, Role } from "../types";
import { del, get, post, put } from "./AxiosWrapper";
import axios, { AxiosResponse } from "axios";
import { rejects } from "assert";

export {};

export interface PostResponse {
  response: AxiosResponse | null | void;
  error: string;
}

async function getObjectList<T>(url: string): Promise<T[]> {
  const response = await get<T[]>(url).catch(function (err) {
    handleError(err);
  });
  const list: T[] = response?.data ?? new Array<T>();
  return list;
}

async function getObject<T>(url: string, params?: any): Promise<T> {
  const response = await get<T>(url, params).catch(function (err) {
    handleError(err);
  });
  const obj: T = response?.data ?? ({} as unknown as T);
  return obj;
}

async function createNewObject<T>(url: string, data: T): Promise<PostResponse> {
  let error = "";
  const response = await post(url, data).catch(function (err) {
    handleError(err);
    error = err.message;
  });
  const postResponse: PostResponse = { response: response, error: error };
  return postResponse;
}

function handleError(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const response = error.response;
    const status: number = response.status;
    console.log(response.data);
    console.log(status);
    console.log(response.headers);
    if (status == 401 || status == 403) {
      const href = "/" + status;
      window.location.href = href;
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
}

export async function signUp<T>(data: T): Promise<PostResponse> {
  return await createNewObject("/users", data);
}

export async function signIn<T>(data: T): Promise<PostResponse> {
  return await createNewObject("/login", data);
}
