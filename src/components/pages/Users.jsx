import { connect } from "react-redux";
import { useState, useRef } from "react";
import MaterialTable from "material-table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { getAllUsers } from "../../redux/actionCreators";
import store from "../../redux/store";

const columns = [
  {
    title: "ID",
    field: "_id",
    hidden: true,
  },
  {
    title: "Nombre",
    field: "nombre",
  },
  {
    title: "Correo",
    field: "email",
  },
  {
    title: "Rol",
    field: "role",
  },
];

const URL = process.env.REACT_APP_API_URL;

const Users = ({ users }) => {
  let fieldName = useRef(null);
  let fieldEmail = useRef(null);
  let fieldPassword = useRef(null);
  let fieldRole = useRef(null);

  const [idUser, setIdUser] = useState("");

  const [userExist, setUserExist] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Modal 2
  const [showModal2, setShowModal2] = useState(false);

  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  const [newUser, setNewUser] = useState({
    nombre: "",
    email: "",
    password: "",
    role: "ADMIN_ROLE",
  });

  const [updateUser, setUpdateUser] = useState({
    nombre: "",
    email: "",
    // password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isEdit) {
      setUpdateUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNewUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    // console.log(newUser);
    // console.log(updateUser);
  };

  const clearInput = () => {
    fieldName.current.value = "";
    fieldEmail.current.value = "";
    fieldPassword.current.value = "";
    fieldRole.current.selectedIndex = 0;
  };

  const handleRemoveInput = () => {
    setNewUser({
      nombre: "",
      email: "",
      password: "",
      role: "ADMIN_ROLE",
    });

    clearInput();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");

    let config = {
      headers: {
        token,
      },
    };
    if (isEdit) {
      // let id = Number(idUser);
      axios
        .put(`${URL}/usuario/${idUser}`, updateUser, config)
        .then((resp) => {
          clearInput();
          store.dispatch(getAllUsers());
          handleShow();
          fieldPassword.current.removeAttribute("disabled");
          setIsEdit(false);
        })
        .catch((err) => alert("Error al actualizar"));
    } else {
      axios
        .post(`${URL}/usuario`, newUser, config)
        .then((resp) => {
          handleRemoveInput();
          store.dispatch(getAllUsers());
          setUserExist(false);
          handleShow();
        })
        .catch((err) => {
          // console.log(err.response)
          setUserExist(true);
        });
    }
  };

  let data = [];

  if (users !== undefined) {
    data = users.map((user) => {
      if (user.role === "ADMIN_ROLE" || user.role === "Administrador") {
        user.role = "Administrador";
      } else {
        user.role = "Asistente";
      }

      return user;
    });
  }
  // console.log(users);

  // Editar

  const handleFillInput = (nombre, email, role, id) => {
    setIdUser(id);

    role = role === "Administrador" ? 0 : 1;

    fieldName.current.value = nombre;
    fieldEmail.current.value = email;
    fieldRole.current.selectedIndex = role;

    role = role === 0 ? "ADMIN_ROLE" : "USER_ROLE";

    setUpdateUser({
      nombre,
      email,
      role,
    });

    fieldPassword.current.setAttribute("disabled", true);
    setIsEdit(true);
  };

  const handleDisableEdit = () => {
    fieldPassword.current.removeAttribute("disabled");
    handleRemoveInput();
    setIsEdit(false);
  };

  // Eliminar

  const [deleteId, setDeleteId] = useState("");

  const handleDeleteUser = (id) => {
    setDeleteId(id);

    handleShowModal2();
  };

  const handleDelteUserAction = () => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        token,
      },
    };
    axios
      .delete(`${URL}/usuario/${deleteId}`, config)
      .then((resp) => {
        store.dispatch(getAllUsers());
      })
      .catch((err) => console.log(err.response));
    handleCloseModal2();
  };

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicText">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="nombre"
                required
                type="text"
                placeholder="Ingrese nombre"
                ref={fieldName}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="email"
                required
                type="email"
                placeholder="Ingrese correo"
                ref={fieldEmail}
              />
              {userExist ? (
                <Form.Text className="mb-4 text-danger">
                  El correo ingresado ya le pertenece a un usuario registrado
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="password"
                required
                type="password"
                placeholder="Ingrese contraseña"
                ref={fieldPassword}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlSelect1">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                ref={fieldRole}
                onChange={handleChange}
                name="role"
                as="select"
              >
                <option value="ADMIN_ROLE">Administrador</option>
                <option value="USER_ROLE">Asistente</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              {!isEdit ? (
                <>
                  <Button className="mr-3" variant="primary" type="submit">
                    Registrar
                  </Button>
                  <Button onClick={handleRemoveInput} variant="secondary">
                    Limpiar
                  </Button>
                  {/* <Button onClick={handlePrueba} variant="secondary">
                    Prueba
                  </Button> */}
                </>
              ) : (
                <>
                  <Button type="submit" className="mr-3" variant="primary">
                    Actualiar
                  </Button>
                  <Button onClick={handleDisableEdit} variant="secondary">
                    Cancelar
                  </Button>
                </>
              )}
            </Form.Group>
          </Form>
        </Col>

        <Col sm={8}>
          <MaterialTable
            columns={columns}
            data={data}
            title="Usuarios"
            actions={[
              {
                icon: "edit",
                tooltip: "Editar usurio",
                onClick: (event, rowData) =>
                  handleFillInput(
                    rowData.nombre,
                    rowData.email,
                    rowData.role,
                    rowData._id
                  ),
              },
              {
                icon: "delete",
                tooltip: "Eliminar usuario",
                onClick: (event, rowData) => handleDeleteUser(rowData._id),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
            localization={{
              header: {
                actions: "Acciones",
              },
            }}
          />
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>Acción realizada correctamente!</Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal2} onHide={handleCloseModal2} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            ¿Está seguro de eliminar al usuario seleccionado?
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal2}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDelteUserAction}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  users: state.userReducer.users,
});

export default connect(mapStateToProps, {})(Users);
