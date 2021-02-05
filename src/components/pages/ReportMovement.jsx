import { connect } from "react-redux";
import { useState, useRef, useEffect } from "react";
import MaterialTable from "material-table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getAllMovements } from "../../redux/actionCreators";
import store from "../../redux/store";

const columns = [
  {
    title: "Tipo",
    field: "tipo",
  },
  {
    title: "Fecha",
    field: "fecha",
  },
  {
    title: "Producto",
    field: "producto",
  },
  {
    title: "Cantidad",
    field: "cantidad",
  },
];

const ReportMovement = ({ movements }) => {
  useEffect(() => {
    store.dispatch(getAllMovements());
  }, []);

  const [valueRadioTipe, setValueRadioTipe] = useState("none");
  const [valueRadioDate, setValueRadioDate] = useState("none");
  const [valueInputDate, setvalueInputDate] = useState({
    desde: "",
    hasta: "",
  });

  const [disabled, setDisabled] = useState(true);

  let fieldDateTo = useRef(null);
  let fieldDateFrom = useRef(null);

  const [data, setData] = useState([]);

  const loadData = (radioTipe, radioDate) => {
    switch (radioDate) {
      case "radioAll":
        switch (radioTipe) {
          case "radioTodo":
            setData(
              movements.map((m) => ({
                tipo: m.nombre,
                fecha: m.fecha,
                producto: m.producto.nombre,
                cantidad: m.cantidad,
              }))
            );
            break;
          case "radioEntrada":
            // setData(movements.filter((m) => m.nombre === "Entrada"));
            break;
          case "radioSalida":
            // setData(movements.filter((m) => m.nombre === "Entrada"));
            break;

          default:
            console.log("Tipo de movimiento no seleccionada");
            break;
        }
        break;
      case "radioRank":
        console.warn("Falta programar :)");
        break;
      default:
        console.log("Rango de fechas no seleccionada");
        break;
    }
  };

  const handleChangeDate = (e) => {
    const { name, value } = e.target;

    setvalueInputDate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeRank = (e) => {
    const { id } = e.target;

    setValueRadioDate(id);
    if (id === "radioRank") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChangeMovement = (e) => {
    const { id } = e.target;
    if (valueRadioDate !== "none") {
      loadData(id, valueRadioDate);
    }
    setValueRadioTipe(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(valueRadioTipe);
    // console.log(valueRadioDate);
    // console.log(valueInputDate);

    switch (valueRadioDate) {
      case "radioAll":
        switch (valueRadioTipe) {
          case "radioTodo":
            console.log("Desde siempre || Todo movimientos");
            break;
          case "radioEntrada":
            console.log("Desde siempre || Entradass");
            break;
          case "radioSalida":
            console.log("Desde siempre || Salidas");
            break;

          default:
            console.log("Tipo de movimiento no seleccionada");
            break;
        }
        break;
      case "radioRank":
        console.warn("Falta programar :)");
        break;
      default:
        console.log("Rango de fechas no seleccionada");
        break;
    }
  };

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Form onSubmit={handleSubmit}>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" sm={2}>
                  Tipo de movimiento
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="Todo"
                    name="formHorizontalRadios"
                    id="radioTodo"
                    required
                    onChange={handleChangeMovement}
                  />
                  <Form.Check
                    type="radio"
                    label="Entradas"
                    name="formHorizontalRadios"
                    id="radioEntrada"
                    onChange={handleChangeMovement}
                  />
                  <Form.Check
                    type="radio"
                    label="Salidas"
                    name="formHorizontalRadios"
                    id="radioSalida"
                    onChange={handleChangeMovement}
                  />
                </Col>
              </Form.Group>
            </fieldset>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" sm={2}>
                  Fecha
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    required
                    type="radio"
                    label="Desde siempre"
                    name="radioFecha"
                    id="radioAll"
                    onChange={handleChangeRank}
                  />
                  <Form.Check
                    type="radio"
                    label="Rango de fechas"
                    name="radioFecha"
                    id="radioRank"
                    onChange={handleChangeRank}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicText">
                <Form.Label>Desde</Form.Label>
                <Form.Control
                  onChange={handleChangeDate}
                  name="desde"
                  required
                  type="date"
                  placeholder="Ingrese nombre"
                  disabled={disabled}
                  ref={fieldDateFrom}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicText2">
                <Form.Label>Hasta</Form.Label>
                <Form.Control
                  onChange={handleChangeDate}
                  name="hasta"
                  required
                  disabled={disabled}
                  type="date"
                  placeholder="Ingrese nombre"
                  ref={fieldDateTo}
                />
              </Form.Group>
            </fieldset>
            <Form.Group>
              <Button className="mr-3" variant="primary" type="submit">
                Generar reporte
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col sm={8}>
          <MaterialTable
            columns={columns}
            data={data}
            title="Movimientos"
            localization={{
              header: {
                actions: "Acciones",
              },
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  movements: state.movementReducer.movements,
});

export default connect(mapStateToProps, {})(ReportMovement);
