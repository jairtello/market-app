import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row } from "react-bootstrap";
import "./Login.css";
import axios from "axios";

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
      window.location = "/";
    })
    .catch(() => alert("Usuario o contraseña incorrecta"));
};

const Login = () => {
  return (
    <div className="vh d-flex align-items-center">
      <Container>
        <Row className="justify-content-md-center">
          <Form onSubmit={authentication.bind()}>
            <h1 className="text-center">Iniciar Sesión</h1>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                name="correo"
                required
                type="email"
                placeholder="Ingrese su e-mail"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="pass"
                required
                type="password"
                placeholder="Ingrese su contraseña"
              />
              {/* <Form.Text className="text-muted">
                Recuerde ingresar bien su contraseña
              </Form.Text> */}
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
