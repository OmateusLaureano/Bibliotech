import { addDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
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

export async function getLivro(id){
    const document = await getDoc(doc(livrosCollection, id))
    return {...document.data(), id: document.id}
}

export async function updateLivro(id, livroEdit){
    await updateDoc(doc(livrosCollection, id), livroEdit)
}