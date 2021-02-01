import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row } from "react-bootstrap";
import "./Login.css";
import axios from "axios";

const Login = ({ addUserToStore }) => {
  const [isLogged, setIsLogged] = useState(true);

  const authentication = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      email: form.correo.value,
      password: form.pass.value,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, data)
      .then((resp) => {
        localStorage.setItem("token", resp.data.token);
        setIsLogged(true);
        window.location = "/";
      })
      .catch(() => {
        setIsLogged(false);
      });
  };

  return (
    <div className="vh d-flex align-items-center">
      <Container>
        <Row className="justify-content-md-center">
          <Form className="form-login" onSubmit={authentication.bind()}>
            <h1 className="text-center mb-5">Login</h1>
            <Form.Group className="mb-5" controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                name="correo"
                required
                type="email"
                placeholder="Ingrese su e-mail"
              />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="pass"
                required
                type="password"
                placeholder="Ingrese su contraseña"
              />
              {!isLogged ? (
                <Form.Text className="mb-5 text-danger">
                  Correo o contraseña incorrecta
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Button block variant="primary" size="lg" type="submit">
              Iniciar sesión
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
