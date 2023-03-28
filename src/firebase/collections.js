import { db } from "./Config";
import { collection } from "firebase/firestore";

export const livrosCollection = collection(db, "livros")