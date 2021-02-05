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
import { getAllCategories } from "../../redux/actionCreators";
import store from "../../redux/store";

const columns = [
  {
    title: "ID",
    field: "_id",
    hidden: true,
  },
  {
    title: "Nombre",
    field: "descripcion",
  },
];

const URL = process.env.REACT_APP_API_URL;

const token = localStorage.getItem("token");

const config = {
  headers: {
    token,
  },
};

const Categories = ({ categories }) => {
  // Hooks
  const [isEdit, setIsEdit] = useState(false);
  const [newCategorie, setNewCategorie] = useState({
    descripcion: "",
  });
  const [updateCategorie, setUpdateCategorie] = useState({
    descripcion: "",
  });
  const [idCategorie, setIdCategorie] = useState("");

  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Modal 2
  const [showModal2, setShowModal2] = useState(false);

  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  // Referencias
  let fieldName = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      axios
        .put(`${URL}/categoria/${idCategorie}`, updateCategorie, config)
        .then((resp) => {
          clearInput();
          store.dispatch(getAllCategories());
          handleShow();
          setIsEdit(false);
        })
        .catch((err) => alert("Error al actualizar"));
    } else {
      axios
        .post(`${URL}/categoria`, newCategorie, config)
        .then((resp) => {
          handleRemoveInput();
          store.dispatch(getAllCategories());
          handleShow();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isEdit) {
      setUpdateCategorie((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNewCategorie((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    // console.log(newCategorie);
    // console.log(updateUser);
  };

  const clearInput = () => {
    fieldName.current.value = "";
  };

  const handleRemoveInput = () => {
    setNewCategorie({
      descripcion: "",
    });
    clearInput();
  };

  const handleDisableEdit = () => {
    clearInput();
    setIsEdit(false);
  };

  // Editar

  const handleEditInput = (descripcion, id) => {
    setIdCategorie(id);

    fieldName.current.value = descripcion;

    setUpdateCategorie({
      descripcion,
    });

    setIsEdit(true);
  };

  // Eliminar

  const handleDeleteCategorie = (id) => {
    setIdCategorie(id);
    handleShowModal2();
  };

  const handleDelteUserAction = () => {
    axios
      .delete(`${URL}/categoria/${idCategorie}`, config)
      .then((resp) => {
        store.dispatch(getAllCategories());
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
                name="descripcion"
                required
                type="text"
                placeholder="Ingrese nombre"
                ref={fieldName}
              />
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
            data={categories}
            title="Categorías"
            actions={[
              {
                icon: "edit",
                tooltip: "Editar categoría",
                onClick: (event, rowData) =>
                  handleEditInput(rowData.descripcion, rowData._id),
              },
              {
                icon: "delete",
                tooltip: "Eliminar categoría",
                onClick: (event, rowData) => handleDeleteCategorie(rowData._id),
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
            ¿Está seguro de eliminar la categoria seleccionada?
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
  categories: state.categorieReducer.categories,
});

export default connect(mapStateToProps, {})(Categories);
