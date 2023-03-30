import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "../../components/Menu/Footer/Footer";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";

// Layout principal do App com Navbar Fixa
// As páginas com Navbar fixa: home, livros, empréstimos, etc
export function Root() {

    const user = useContext(AuthContext)

    if(user === null){
        return <Navigate to="/login" />
    }

    return (
        <>
            <header>
                <Menu />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}