import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import googleIcon from "../../assets/icons/google-white.svg";
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha, loginGoogle } from "../../firebase/Auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css"

export function Cadastro() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    function onSubmit(data) {
        const { email, senha } = data;
        cadastrarEmailSenha(email, senha)
            .then((user) => {
                toast.success(`Bem-vindo(a) ${user.email}`, {
                    position: "bottom-right",
                    duration: 2500,
                });
                navigate("/");
            })
            .catch((erro) => {
                toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
                    position: "bottom-right",
                    duration: 2500,
                });
            });
    }

    function onLoginGoogle() {
        // then = quando der certo o processo
        loginGoogle()
            .then((user) => {
                toast.success(`Bem-vindo(a) ${user.email}`, {
                    position: "bottom-right",
                    duration: 2500,
                });
                navigate("/");
            })
            .catch((erro) => {
                // tratamento de erro
                toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
                    position: "bottom-right",
                    duration: 2500,
                });
            });
    }

    return (
        <Container fluid className="container-cadastro">
            <div className="box-cadastro">
                <p className="text-center">
                    <img src={logoIcon} width="126" alt="Logo do app" />
                </p>
                <h4>Faça parte da nossa plataforma</h4>
                <p className="text-muted">
                    Já tem conta? <Link to="/login">Entre</Link>
                </p>
                <hr />
                <Button className="mb-4" variant="danger" onClick={onLoginGoogle}>
                    <img src={googleIcon} width="32" alt="Logo do google" />
                    Entrar com o Google
                </Button>
                <Form onSubmit={handleSubmit(onSubmit)} className="form-container">
                    <Form.Group className="group" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            className={errors.email && "is-invalid"}
                            placeholder="Seu email"
                            {...register("email", { required: "O email é obrigatório" })}
                        />
                        <Form.Text className="invalid-feedback">
                            {errors.email?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="group" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            className={errors.senha && "is-invalid"}
                            placeholder="Sua senha"
                            {...register("senha", { required: "A senha é obrigatória" })}
                        />
                        <Form.Text className="invalid-feedback">
                            {errors.senha?.message}
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit" variant="success" className="mt-4">
                        Cadastrar
                    </Button>
                </Form>
            </div>
        </Container>
    );
}