import { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import loginImg from "../../assets/images/login.png";
import { AuthContext } from "../../contexts/AuthContext";
import { loginEmailSenha, loginGoogle } from "../../firebase/Auth";
import "./Login.css"

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const user = useContext(AuthContext)

    if(user !== null){
        navigate("/")
    }

    function onSubmit(data) {
        const { email, senha } = data
        loginEmailSenha(email, senha).then((user) => {
            toast.success(`Bem vindo, ${user.email}!`,
                { position: "bottom-right", duration: 3000, })
            navigate("/")
        }).catch((erro) => {
            toast.error(`Um erro aconteceu. Código: ${erro.code}`,
                { position: "bottom-right", duration: 3000, })
        })
    }

    function onLoginGoogle() {
        loginGoogle().then((user) => {
            toast.success(`Bem vindo, ${user.displayName}!`,
                { position: "bottom-right", duration: 3000, })
            navigate("/")
        }).catch((erro) => {
            toast.error(`Um erro aconteceu. Código: ${erro.code}`,
                { position: "bottom-right", duration: 3000, })
        })
    }

    return (
        <Container fluid className="container-login">
            <div className="box-login">
                <p className="text-center">
                    <img src={loginImg} width="126" alt="Logo" />
                </p>
                <h4>Bem-vindo(a) de volta!</h4>
                <p className="text-muted">
                    Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
                </p>
                <hr />
                <Button
                    className="mb-4"
                    variant="danger"
                    onClick={onLoginGoogle}
                >
                    <img src={googleIcon} width="32" alt="Logo do google" /> Entrar com o
                    Google
                </Button>
                <Form onSubmit={handleSubmit(onSubmit)} className="form-container">
                    <Form.Group className="group" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Seu email"
                            className={errors.email ? "is-invalid" : ""}
                            {...register("email", { required: "Email é obrigatório" })}
                        />
                        <Form.Text className="invalid-feedback">
                            {errors.email?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="group" controlId="senha">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Sua senha"
                            className={errors.senha ? "is-invalid" : ""}
                            {...register("senha", { required: "Senha é obrigatória" })}
                        />
                        <Form.Text className="invalid-feedback">
                            {errors.senha?.message}
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit" variant="success" className="mt-4">
                        Entrar
                    </Button>
                </Form>
            </div>
        </Container>
    );
}