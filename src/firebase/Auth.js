import {createUserWithEmailAndPassword, 
        GoogleAuthProvider, 
        signInWithEmailAndPassword, 
        signInWithPopup, 
        signOut} from "firebase/auth"
import { auth } from "./Config"

// função assíncrona = que o resultado não é obtido de imediato
export async function cadastrarEmailSenha(email,senha){

    //indicar para o firebase que queremos cadastrar um novo usuário utilizando
    // um novo usuário/senha

    //Aguardadno o resultado do firebase
    const resultado = await createUserWithEmailAndPassword(auth, email, senha)

    return resultado.user
}

export async function loginGoogle(){
    //Configurar como o login do google vai funcionar
    const provider = new GoogleAuthProvider()
    const resultado = await signInWithPopup(auth, provider)
    return resultado.user
}

export async function loginEmailSenha(email, senha){
    
const resultado = await signInWithEmailAndPassword(auth, email, senha)
return resultado.user
}
export async function logOut(){
    await signOut(auth)
}

