import { AppFireStorage } from "./Storage/AppFireStorage";
import { LocalStorage } from "./Storage/LocalStorage";

export class Config {
    public static LOCAL_STORAGE = new LocalStorage();
    public static FIREBASE_STORAGE = new AppFireStorage();
}