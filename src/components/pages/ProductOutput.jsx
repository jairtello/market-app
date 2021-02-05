import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { getAllMovements } from "../../redux/actionCreators";
import store from "../../redux/store";

const columns = [
  {
    title: "ID",
    field: "_id",
    hidden: true,
  },
  {
    title: "IDP",
    field: "producto._id",
    hidden: true,
  },
  {
    title: "Producto",
    field: "producto.nombre",
  },
  {
    title: "Categoria",
    field: "producto.categoria.descripcion",
  },
  {
    title: "Fecha",
    field: "fecha",
  },
  {
    title: "Cantidad salida",
    field: "cantidad",
  },
];

const URL = process.env.REACT_APP_API_URL;

const token = localStorage.getItem("token");

const config = {
  headers: {
    token,
  },
};

const ProductOutput = ({ movements, products }) => {
  // Hooks
  const [idProduct, setIdProduct] = useState(0);
  const [messageWarning, setMessageWarning] = useState(false);
  const [newMovement, setNewMovement] = useState({
    nombre: "Salida",
    producto: 0,
    fecha: new Date().toLocaleDateString(),
    cantidad: 0,
  });
  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Modal 2
  const [showModal2, setShowModal2] = useState(false);

  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  // Referancias
  let fieldProducto = useRef(null);
  let fieldFecha = useRef(null);
  let fieldCantidad = useRef(null);
  let fieldStock = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newMovement.producto === "0" || newMovement.producto === 0) {
      setMessageWarning(true);
    } else {
      setMessageWarning(false);
      let idProducto = newMovement.producto;

      axios
        .get(`${URL}/producto/${idProducto}`, config)
        .then((respProduct) => {
          if (Number(newMovement.cantidad) > 0) {
            if (
              Number(newMovement.cantidad) <= respProduct.data.producto.cantidad
            ) {
              axios
                .post(`${URL}/movimiento`, newMovement, config)
                .then((respMovimiento) => {
                  let newCantidad =
                    respProduct.data.producto.cantidad -
                    Number(newMovement.cantidad);
                  let data = {
                    nombre: respProduct.data.producto.nombre,
                    precioUni: respProduct.data.producto.precioUni,
                    categoria: respProduct.data.producto.categoria._id,
                    disponible: respProduct.data.producto.disponible,
                    cantidad: newCantidad,
                  };
                  axios
                    .put(`${URL}/producto/${idProducto}`, data, config)
                    .then((resp) => {
                      handleRemoveInput();
                      store.dispatch(getAllMovements());
                      handleShow();
                    })
                    .catch((err) => console.log(err.response));
                })
                .catch((err) => console.log(err.response));
            } else {
              console.log("La cantidad exece al stock del producto");
            }
          } else {
            console.log("No se permite negativo ni 0");
          }
        })
        .catch((err) => console.log(err.response));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMessageWarning(false);
    setNewMovement((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    if (value !== "0") {
      axios
        .get(`${URL}/producto/${value}`, config)
        .then((resp) => {
          // fieldStock.current.setAttribute("value", "gaaa");
          fieldStock.current.setAttribute("value", resp.data.producto.cantidad);
        })
        .catch((err) => console.log(err.response));
    } else {
      fieldStock.current.setAttribute("value", "");
    }

    setMessageWarning(false);
    setNewMovement((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // console.log(newMovement);
  };

  useEffect(() => {
    const fecha = new Date().toLocaleDateString();
    fieldFecha.current.value = fecha;
  }, []);

  let movementsSalida = [];

  if (movements !== undefined) {
    movementsSalida = movements.filter((c) => c.nombre === "Salida");
  }

  const clearInput = () => {
    fieldProducto.current.selectedIndex = 0;
    fieldFecha.current.value = new Date().toLocaleDateString();
    fieldCantidad.current.value = "";
    fieldStock.current.setAttribute("value", "");
  };

  const handleRemoveInput = () => {
    setNewMovement({
      nombre: "Salida",
      producto: 0,
      fecha: new Date().toLocaleDateString(),
      cantidad: 0,
    });
    clearInput();
  };

  // Eliminar
  const [deleteId, setDeleteId] = useState("");
  const handleDeleteMovement = (id, idP) => {
    setDeleteId(id);
    setIdProduct(idP);
    handleShowModal2();
  };

  const handleDeleteMovementAction = () => {
    axios
      .delete(`${URL}/movimiento/${deleteId}`, config)
      .then((respMovement) => {
        // console.log(respMovement.data.movimiento.cantidad);
        axios
          .get(`${URL}/producto/${idProduct}`, config)
          .then((respProduct) => {
            // console.log(respProduct.data.producto.cantidad);

            let newCantidad =
              respProduct.data.producto.cantidad +
              respMovement.data.movimiento.cantidad;
            let data = {
              nombre: respProduct.data.producto.nombre,
              precioUni: respProduct.data.producto.precioUni,
              categoria: respProduct.data.producto.categoria._id,
              disponible: respProduct.data.producto.disponible,
              cantidad: newCantidad,
            };
            axios
              .put(`${URL}/producto/${idProduct}`, data, config)
              .then((resp) => {
                handleRemoveInput();
                store.dispatch(getAllMovements());
              })
              .catch((err) => console.log(err.response));
            store.dispatch(getAllMovements());
          })
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(err.response));
    handleCloseModal2();
  };

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <h1 className="mb-5">Salida</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="exampleForm.ControlSelect1">
              <Form.Label>Producto</Form.Label>
              <Form.Control
                ref={fieldProducto}
                onChange={handleChange2}
                name="producto"
                as="select"
              >
                <option value={0}>Sellecione producto</option>
                {products
                  ? products.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.nombre}
                      </option>
                    ))
                  : ""}
              </Form.Control>
              {messageWarning ? (
                <Form.Text className="mb-4 text-danger">
                  Tiene que seleccionar un producto
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group
              className="mb-4"
              as={Row}
              controlId="formPlaintextSrock"
            >
              <Form.Label lg={2} column="sm" className="text-primary">
                Stock
              </Form.Label>
              <Col sm="3">
                <Form.Control ref={fieldStock} disabled size="sm" type="text" />
              </Col>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicTextDate">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="fecha"
                required
                type="text"
                disabled
                placeholder="Ingrese fecha"
                ref={fieldFecha}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicTextCant">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="cantidad"
                required
                type="number"
                placeholder="Ingrese cantidad"
                ref={fieldCantidad}
              />
            </Form.Group>
            <Form.Group>
              <>
                <Button className="mr-3" variant="primary" type="submit">
                  Registrar
                </Button>
                <Button onClick={handleRemoveInput} variant="secondary">
                  Limpiar
                </Button>
              </>
            </Form.Group>
          </Form>
        </Col>
        <Col sm={8}>
          <MaterialTable
            columns={columns}
            data={movementsSalida}
            title="Salidas"
            actions={[
              {
                icon: "delete",
                tooltip: "Anular entrada",
                onClick: (event, rowData) =>
                  handleDeleteMovement(rowData._id, rowData.producto._id),
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
              ¿Está seguro cancelar el movimiento seleccionado?
            </Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal2}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleDeleteMovementAction}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  movements: state.movementReducer.movements,
  products: state.productReducer.products,
});

export default connect(mapStateToProps, {})(ProductOutput);
