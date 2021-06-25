
import { Config } from "./config";
import { Note } from "./Notes/Note";
import { Notes } from "./Notes/Notes";

export class App {
    createButton : HTMLButtonElement;
    cancleButton : HTMLButtonElement;
    titleInput : HTMLInputElement;
    textInput : HTMLInputElement;
    pinButton : HTMLInputElement;
    colorPicker : HTMLInputElement;
    notes : Notes;


    constructor() {
        this.createButton = <HTMLButtonElement>document.getElementById('create_button');
        this.cancleButton = <HTMLButtonElement>document.getElementById('cancel_button');
        this.titleInput = <HTMLInputElement>document.getElementById('note_title');
        this.textInput = <HTMLInputElement>document.getElementById('note_text');
        this.pinButton = <HTMLInputElement>document.getElementById('pin_button');
        this.colorPicker = <HTMLInputElement>document.getElementById('note_color');

        this.notes = new Notes(Config.STORAGE);

        this.setEventListeners();
    }

    setEventListeners() : void {
        this.createButton.addEventListener('click',() => this.createNote());
        this.cancleButton.addEventListener('click', () => this.cancelNote());

    }

    createNote() : void {
        const title = this.titleInput.value;
        const text = this.textInput.value;
        const isStared = this.pinButton.checked;
        const color = this.colorPicker.value;

        const note = new Note(title, text, isStared, color, new Date());
        this.notes.addNote(note);
    }

    cancelNote() : void {
        this.titleInput.value = '';
        this.textInput.value = '';
        this.pinButton.checked = false;
        this.colorPicker.value = '#337D47';
    }
}