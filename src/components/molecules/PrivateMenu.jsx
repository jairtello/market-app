import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getUserLogIn } from "../../redux/actionCreators";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

const removeLocalStorage = () => {
  localStorage.removeItem("token");
  window.location = "/login";
};

const PrivateMenu = ({ addUserToStore, nombre, email, role }) => {
  useEffect(() => {
    let token = localStorage.getItem("token");
    let payload = parseJwt(token);
    let { nombre, email, role } = payload.usuario;
    addUserToStore(nombre, email, role);
  });

  role = role === "ADMIN_ROLE" ? "ADMINISTRADOR" : "ASISTENTE";

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} exact to="/">
          {role}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {role === "ADMINISTRADOR" ? (
              <Nav.Link as={NavLink} to="/usuarios">
                Usuarios
              </Nav.Link>
            ) : (
              ""
            )}
            <Nav.Link as={NavLink} to="/categorias">
              Categoría
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos">
              Producto
            </Nav.Link>
            <Nav.Link as={NavLink} to="/reportes">
              Reportes
            </Nav.Link>
            <NavDropdown title="Movimiento" id="collasible-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/entrada-productos">
                Entrada
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/salida-productos">
                Salida
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title={nombre} id="collasible-nav-dropdown">
              <div className="d-flex justify-content-center">
                <Navbar.Text className="text-dark">{email}</Navbar.Text>
              </div>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => removeLocalStorage()}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  nombre: state.loginReducer.nombre,
  email: state.loginReducer.email,
  role: state.loginReducer.role,
});

const mapDispatchToProps = (dispatch) => ({
  addUserToStore(nombre, email, role) {
    dispatch(getUserLogIn(nombre, email, role));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateMenu);
