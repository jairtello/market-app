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
import { getAllProducts } from "../../redux/actionCreators";
import store from "../../redux/store";

const columns = [
  {
    title: "IDP",
    field: "_id",
    hidden: true,
  },
  {
    title: "IDC",
    field: "categoria._id",
    hidden: true,
  },
  {
    title: "Nombre",
    field: "nombre",
  },
  {
    title: "Precio Unitario",
    field: "precioUni",
  },
  {
    title: "Categoria",
    field: "categoria.descripcion",
  },
];

const URL = process.env.REACT_APP_API_URL;

const token = localStorage.getItem("token");

const config = {
  headers: {
    token,
  },
};

const Product = ({ products, categories }) => {
  // Hooks
  const [idProduct, setIdProduct] = useState(0);
  const [messageWarning, setMessageWarning] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    precioUni: 0,
    categoria: 0,
  });
  const [updateProduct, setUpdateProduct] = useState({
    nombre: "",
    precioUni: 0,
    categoria: 0,
    disponible: true,
  });
  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Modal 2
  const [showModal2, setShowModal2] = useState(false);

  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  // Referencias
  let fieldName = useRef(null);
  let fieldPrecio = useRef(null);
  let fieldCategoria = useRef(null);

  let data = [];
  if (products !== undefined) {
    data = products.map((product) => {
      if (product.categoria === null) {
        product.categoria = {};
        product.categoria.descripcion = "No asignada";
      }

      return product;
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      if (
        updateProduct.categoria === "0" ||
        updateProduct.categoria === 0 ||
        updateProduct.categoria === undefined
      ) {
        setMessageWarning(true);
      } else {
        setMessageWarning(false);
        axios
          .put(`${URL}/producto/${idProduct}`, updateProduct, config)
          .then((resp) => {
            clearInput();
            store.dispatch(getAllProducts());
            handleShow();
            setIsEdit(false);
          })
          .catch((err) => console.log(err.response));
      }
    } else {
      if (newProduct.categoria === "0" || newProduct.categoria === 0) {
        setMessageWarning(true);
      } else {
        setMessageWarning(false);
        axios
          .post(`${URL}/producto`, newProduct, config)
          .then((resp) => {
            handleRemoveInput();
            store.dispatch(getAllProducts());
            handleShow();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isEdit) {
      setUpdateProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setMessageWarning(false);
      setNewProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const clearInput = () => {
    fieldName.current.value = "";
    fieldPrecio.current.value = "";
    fieldCategoria.current.selectedIndex = 0;
    setMessageWarning(false);
  };

  const handleRemoveInput = () => {
    setNewProduct({
      nombre: "",
      precioUni: 0,
      categoria: 0,
    });
    clearInput();
  };

  const handleEditInput =   (idProduc, nombre, precioUni, idCategorie) => {
    setIdProduct(idProduc);
    fieldName.current.value = nombre;
    fieldPrecio.current.value = precioUni;
    if (idCategorie) {
      let index = categories.findIndex((c) => c._id === idCategorie);
      // console.log("xd: ", index);
      fieldCategoria.current.selectedIndex = index + 1;
    } else {
      fieldCategoria.current.selectedIndex = 0;
    }

    setUpdateProduct({
      nombre,
      precioUni,
      disponible: true,
      categoria: idCategorie,
    });

    setIsEdit(true);
  };

  const handleDisableEdit = () => {
    clearInput();
    setUpdateProduct({
      nombre: "",
      disponible: true,
      precioUni: 0,
      categoria: 0,
    });
    setIsEdit(false);
  };

  // ELiminar
  const [deleteId, setDeleteId] = useState("");

  const handleDeleteCategorie = (id) => {
    setDeleteId(id);

    handleShowModal2();
  };

  const handleDelteProductAction = () => {
    axios
      .delete(`${URL}/producto/${deleteId}`, config)
      .then((resp) => {
        store.dispatch(getAllProducts());
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
            <Form.Group className="mb-4" controlId="formBasicTextPrice  ">
              <Form.Label>Precio unitario S/.</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="precioUni"
                required
                type="number"
                placeholder="Ingrese precio"
                ref={fieldPrecio}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlSelect1">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                ref={fieldCategoria}
                onChange={handleChange}
                name="categoria"
                as="select"
              >
                <option value={0}>Sellecione categoría</option>
                {categories
                  ? categories.map((categorie) => (
                      <option key={categorie._id} value={categorie._id}>
                        {categorie.descripcion}
                      </option>
                    ))
                  : ""}
              </Form.Control>
              {messageWarning ? (
                <Form.Text className="mb-4 text-danger">
                  Tiene que seleccionar una categoria
                </Form.Text>
              ) : (
                ""
              )}
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
            data={data}
            title="Categorías"
            actions={[
              {
                icon: "edit",
                tooltip: "Editar producto",
                onClick: (event, rowData) =>
                  handleEditInput(
                    rowData._id,
                    rowData.nombre,
                    rowData.precioUni,
                    rowData.categoria._id
                  ),
              },
              {
                icon: "delete",
                tooltip: "Eliminar producto",
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
            ¿Está seguro de eliminar el producto seleccionado?
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal2}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDelteProductAction}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  categories: state.categorieReducer.categories,
});

export default connect(mapStateToProps, {})(Product);
