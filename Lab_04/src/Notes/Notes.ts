import { Note } from "./Note";
import { IAppStorage } from "../Storage/IAppStorage";

export class Notes {
    notes: Note[] = [];
    storage: IAppStorage;
    notesContainer: HTMLElement;

    constructor(storage: IAppStorage) {
        this.notesContainer = document.getElementById('notes_container');
        this.storage = storage;

        this.getFromStorage();
    }

    addNote(note: Note): void {
        this.notes.push(note);

        this.storage.saveToStorage(note);
        this.writeToContainer();
    }

    removeNote(note: Note): void {
        const index = this.notes.indexOf(note);
        delete this.notes[index];

        this.storage.saveToStorage(note);
        this.writeToContainer();
    }

    getFromStorage(): void {
        this.storage.readFromStorage().then(n => {
            n.forEach(element =>{
                this.notes.push(element);
            });
            this.writeToContainer();
        });
    }

    writeToContainer(): void {
        this.notesContainer.innerHTML = '';
        if (this.notes && this.notes.length > 0) {
            this.notes.sort((a,b) => {
                return (a.isStared === b.isStared)? 0 : a.isStared? -1 :1;
            })

            for (let n in this.notes) {
                this.notesContainer.innerHTML += this.notes[n].createHTMLNoteDiv();
            }
        }
    }
}