import { Note } from "../Notes/Note";
import { IAppStorage } from "./IAppStorage";
import firebase from "firebase";

export class AppFireStorage implements IAppStorage {
    db : firebase.firestore.Firestore
    firebaseConfig = {
        apiKey: "AIzaSyD8yrxay0UG8UAFc3J12BLl-dMiMJd0MoQ",
        authDomain: "notekeepwap.firebaseapp.com",
        projectId: "notekeepwap",
        storageBucket: "notekeepwap.appspot.com",
        messagingSenderId: "576881405862",
        appId: "1:576881405862:web:f68cb7cbdea32e79482967"
      };

    constructor() {
        const firebaseApp = firebase.initializeApp(this.firebaseConfig);
        this.db = firebaseApp.firestore();
    }

    saveToStorage(note: Note): void {
            this.addNote(note);
    }

    async readFromStorage() : Promise<Note[]> { 
        const notes : Note[] = [];

        return await this.db.collection('notes').get().then(querrySnapshot=>{
            for(let doc in querrySnapshot.docs){
                notes.push(Object.assign(new Note(), querrySnapshot.docs[doc].data()));
            }
            return notes;
        });
    }    

    private async addNote(note: Note) {
        const data = {};
        Object.assign(data, note);
        const res = await this.db.collection('notes').add(data);
    }
}