export interface Unit {
    id: string;
    name: string
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