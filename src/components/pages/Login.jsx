import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { LOGIN_JTW_URL } from "../../redux/actions";

const authentication = (e) => {
  e.preventDefault();
  const form = e.target;

  const data = {
    email: form.email.value,
    password: form.password.value,
  };

  axios
    .post(LOGIN_JTW_URL, data)
    .then((resp) => {
      localStorage.setItem("token", resp.data.token);
      window.location = "/"
    }).catch(()=>alert("Correo o contraseña incorrecta"));
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
                name="email"
                required
                type="email"
                placeholder="Ingrese su e-mail"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
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
