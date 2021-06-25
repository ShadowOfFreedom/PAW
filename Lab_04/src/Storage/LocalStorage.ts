import { IAppStorage } from "./IAppStorage";
import { Note } from "../Notes/Note";

export class LocalStorage implements IAppStorage {

    saveToStorage(note: Note): void {
        localStorage.notes += JSON.stringify(note);
    }

     async readFromStorage(): Promise<Note[]> {
        const data = localStorage.notes;
        let notes: Note[] = [];
        let tmp: [];

        if (data) {
            tmp = JSON.parse(data);
            for (let e in tmp){
                notes.push(Object.assign(new Note(), tmp[e]));
            }
        }        
        return notes;
    }
}