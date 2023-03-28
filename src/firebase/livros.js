import { addDoc, getDocs } from "firebase/firestore";
import { livrosCollection } from "./collections";

export async function addBook(novoLivro){
    await addDoc(livrosCollection, novoLivro)
}

export async function getLivros(){
    const get = await getDocs(livrosCollection)
    let livros = []
    get.forEach(doc =>{
        livros.push({...doc.data(), id: doc.id})
    })
    return livros
}