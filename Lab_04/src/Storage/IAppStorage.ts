import { Note } from "../Notes/Note";

export interface IAppStorage{
    saveToStorage(note: Note) : void;
    readFromStorage() : Promise<Note[]>;
}