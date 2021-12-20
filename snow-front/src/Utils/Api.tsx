import { Unit, User, Level, BackUp, Task, TaskInf, Session } from "../types";
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

async function getObject<T>(url: string, params?: any): Promise<T[]> {
  const response = await get<T[]>(url, params).catch(function (err) {
    handleError(err);
  });
  const list: T[] = response?.data ?? new Array<T>();
  return list;
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

async function UpdateObject<T>(url: string, data: T): Promise<PostResponse> {
  let error = '';
  const response = await put(url, data).catch(function (err) {
    handleError(err);
    error = err.message;
  });
  const postResponse: PostResponse = {response: response, error: error}
  return postResponse
}

async function deleteObject(url: string, params?: any): Promise<PostResponse> {
  let error = '';
  const response = await del(url, params).catch(function (err) {
    handleError(err);
    error = err.message;
  });
  const postResponse: PostResponse = {response: response, error: error}
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

export async function addSession<T>(data: T): Promise<PostResponse> {
  return await createNewObject("/sessions", data);
}

export async function getSessions() {
  return await getObjectList<Session>('/sessions');
}

export async function deleteSession(id: string): Promise<PostResponse> {
  return await deleteObject('/sessions/' + id)
}

export async function updateSession<T>(data: T, id: string): Promise<PostResponse> {
  return await UpdateObject('/sessions/' + id, data)
}

export async function signIn<T>(data: T): Promise<PostResponse> {
  return await createNewObject("/login", data);
}


export async function getUsers() {
  return await getObjectList<User>('/users');
}

export async function backUp() {
  return await getObjectList<BackUp>('/backup');
}

export async function updateUser<T>(data: T, id: string): Promise<PostResponse> {
  return await UpdateObject('/users/' + id, data)
}

export async function getUser(id: String) {
  return await getObject<User>('/users/' + id);
}

export async function deleteUser(id: string): Promise<PostResponse> {
  return await deleteObject('/users/' + id)
}

export async function getLevel(id: String) {
  return await getObject<Level>('/levels/' + id);
}

export async function getLevels() {
  return await getObjectList<Level>('/levels');
}

export async function getLocation(id: String) {
  return await getObject<Level>('/locations/' + id);
}

export async function getLocations() {
  return await getObjectList<Level>('/locations');
}

export async function getTasks() {
  return await getObjectList<Task>('/tasks');
}

export async function updateTask<T>(data: T, id: string): Promise<PostResponse> {
  return await UpdateObject('/tasks/' + id, data)
}

export async function getTask(id: String) {
  return await getObject<Task>('/tasks/' + id);
}

export async function getTaskInfo(id: String) {
  return await getObject<TaskInf>('/tasks/info/' + id);
}

export async function deleteTask(id: string): Promise<PostResponse> {
  return await deleteObject('/tasks/' + id)
}

export async function addTask<T>(data: T): Promise<PostResponse> {
  return await createNewObject("/tasks", data);
}