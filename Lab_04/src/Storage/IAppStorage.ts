import { Note } from "../Notes/Note";

export interface IAppStorage{
    saveToStorage(notes: Note[]) : void;
    readFromStorage() : Note[];
}