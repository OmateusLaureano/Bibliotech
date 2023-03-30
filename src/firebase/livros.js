import { addDoc, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { livrosCollection } from "./collections";
import {storage} from "./Config"

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
export async function deleteLivro(id){
    await deleteDoc(doc(livrosCollection, id))
}

export async function uploadCapaLivro(image){
    const fileName = image.name
    const imageRef = ref(storage, `/livros/${fileName}`)
    const result = await uploadBytes(imageRef, image)
    return await getDownloadURL(result.ref)
}

