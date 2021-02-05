import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./Home.css";
import { useEffect, useState } from "react";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

const Home = () => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    let token = localStorage.getItem("token");
    let payload = parseJwt(token);
    let { nombre, role } = payload.usuario;
    if (role === "ADMIN_ROLE") {
      role = "Administrador";
    } else {
      role = "Asistente";
    }
    setUser(nombre);
    setRole(role);
  }, []);
  return (
    <>
      <div className="home-container">
        <div className="bg-black"></div>
        <div className="bg-home"></div>
      </div>
      <Container>
        <Card
          bg={"Info".toLowerCase()}
          text={"Info".toLowerCase() === "light" ? "dark" : "white"}
          style={{ width: "18rem" }}
          className="mb-2 card-home"
        >
          <Card.Header>{role}</Card.Header>
          <Card.Body>
            <Card.Title className="mb-5">
              Buen día <strong>{user}</strong>
            </Card.Title>
            <Card.Text className="text-phrase">
              " El único modo de hacer un gran trabajo es amar lo que haces. "{" "}
              <small>Steve Jobs</small>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Home;
