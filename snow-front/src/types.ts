export interface Unit {
  id: string;
  name: string;
}

export interface Idable {
  id: string;
}

export interface BackUp {
  sessions: string;
  levels: string;
  advice: string;
  records: string;
  tasks: string;
  users: string;
}

export interface Level {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  level: Level;
}

export interface Task {
  _id: string;
  name: string;
  link: string;
  level: Level;
  text: string;
}

export interface TaskInf {
  _id: string;
  name: string;
  link: string;
  level: Level;
  username: string;
  text: string;
}

export interface UserInf {
  _id: string;
  username: string;
}

export interface Session {
  _id: string;
  instructor: UserInf;
  user: UserInf;
  location: Level;
  dtstart: Date;
  dtfinish: Date;
}


export interface Query {
  _id: string;
  location: Level;
  dtstart: Date;
  dtfinish: Date;
}