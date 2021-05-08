import { User } from "./user";

export interface Todo {
    id: number;
    title: string;
    isDone: boolean;
    dueDate: Date;
}
