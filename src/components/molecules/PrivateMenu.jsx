import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

const removeLocalStorage = () => {
  localStorage.removeItem("token");
  window.location = "/login";
};

const PrivateMenu = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} exact to="/">
          Inicio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/usuarios">
              Usuarios
            </Nav.Link>
            <Nav.Link as={NavLink} to="/reportes">
              Reportes
            </Nav.Link>
            <NavDropdown title="Productos" id="collasible-nav-dropdown">
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
            <Nav.Link as={NavLink} disabled to="#deets">
              Nombre de usuario
            </Nav.Link>
            <Nav.Link onClick={() => removeLocalStorage()}>
              Cerrar sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PrivateMenu;
