import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { auth } from "./firebase/Config";
import { AddLivro} from "./pages/AddLivro/AddLivro";
import { AdicionarEmprestimo } from "./pages/AdicionarEmprestimo/AdicionarEmprestimo";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { EditEmprestimos } from "./pages/EditEmprestimos/EditEmprestimos";
import { EditLivro } from "./pages/EditLivro/EditLivro";
import { Emprestimos } from "./pages/Emprestimos/Emprestimos";
import { Home } from "./pages/Home/Home";
import { Livros } from "./pages/Livros/Livros";
import { Login } from "./pages/Login/Login";
import { Root } from "./pages/Root/Root";

export function App() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [])

    return (<>
        <AuthContext.Provider value={user}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/livros" element={<Livros/>}/>
                        <Route path="/livros/adicionar" element={<AddLivro />} />
                        <Route path="/livros/editar/:id" element={<EditLivro />} />
                        <Route path="/emprestimos" element={<Emprestimos />} />
                        <Route path="/emprestimos/adicionar" element={<AdicionarEmprestimo />} />
                        <Route path="/emprestimos/editar/:id" element={<EditEmprestimos />} />
                    </Route>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Cadastro" element={<Cadastro />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
        <Toaster />
    </>)
}