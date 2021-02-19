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
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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

  // String to Date

  const convertDateToNumberAPI = (date) => {
    const splitDate = date.split("/");

    const dateFormat = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);

    return dateFormat.getTime();
  };

  const convertDateToNumberInput = (date) => {
    const splitDate = date.split("-");

    const dateFormat = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);

    return dateFormat.getTime();
  };

  const loadData = (radioTipe, radioDate, desde = "", hasta = "") => {
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
            let dataEntry = movements.filter((m) => m.nombre === "Entrada");
            setData(
              dataEntry.map((m) => ({
                tipo: m.nombre,
                fecha: m.fecha,
                producto: m.producto.nombre,
                cantidad: m.cantidad,
              }))
            );
            break;
          case "radioSalida":
            let dataOutPut = movements.filter((m) => m.nombre === "Salida");
            setData(
              dataOutPut.map((m) => ({
                tipo: m.nombre,
                fecha: m.fecha,
                producto: m.producto.nombre,
                cantidad: m.cantidad,
              }))
            );
            break;

          default:
            console.log("Tipo de movimiento no seleccionada");
            break;
        }
        break;
      case "radioRank":
        switch (radioTipe) {
          case "radioTodo":
            if (desde === "" && hasta === "") {
              if (valueInputDate.desde !== "" && valueInputDate.hasta !== "") {
                const desdeNumber = convertDateToNumberInput(
                  valueInputDate.desde
                );
                const hastaNumber = convertDateToNumberInput(
                  valueInputDate.hasta
                );

                let dataEntry = movements.filter(
                  (m) =>
                    convertDateToNumberAPI(m.fecha) >= desdeNumber &&
                    convertDateToNumberAPI(m.fecha) <= hastaNumber
                );
                setData(
                  dataEntry.map((m) => ({
                    tipo: m.nombre,
                    fecha: m.fecha,
                    producto: m.producto.nombre,
                    cantidad: m.cantidad,
                  }))
                );
              }
            } else {
              const desdeNumber = convertDateToNumberInput(desde);
              const hastaNumber = convertDateToNumberInput(hasta);

              let dataEntry = movements.filter(
                (m) =>
                  convertDateToNumberAPI(m.fecha) >= desdeNumber &&
                  convertDateToNumberAPI(m.fecha) <= hastaNumber
              );
              setData(
                dataEntry.map((m) => ({
                  tipo: m.nombre,
                  fecha: m.fecha,
                  producto: m.producto.nombre,
                  cantidad: m.cantidad,
                }))
              );
            }
            break;
          case "radioEntrada":
            let dataEntryFilter = movements.filter(
              (m) => m.nombre === "Entrada"
            );

            if (desde === "" && hasta === "") {
              if (valueInputDate.desde !== "" && valueInputDate.hasta !== "") {
                const desdeNumber = convertDateToNumberInput(
                  valueInputDate.desde
                );
                const hastaNumber = convertDateToNumberInput(
                  valueInputDate.hasta
                );

                let dataEntry = dataEntryFilter.filter(
                  (m) =>
                    convertDateToNumberAPI(m.fecha) >= desdeNumber &&
                    convertDateToNumberAPI(m.fecha) <= hastaNumber
                );
                setData(
                  dataEntry.map((m) => ({
                    tipo: m.nombre,
                    fecha: m.fecha,
                    producto: m.producto.nombre,
                    cantidad: m.cantidad,
                  }))
                );
              }
            } else {
              const desdeNumber = convertDateToNumberInput(desde);
              const hastaNumber = convertDateToNumberInput(hasta);

              let dataEntry = dataEntryFilter.filter(
                (m) =>
                  convertDateToNumberAPI(m.fecha) >= desdeNumber &&
                  convertDateToNumberAPI(m.fecha) <= hastaNumber
              );
              setData(
                dataEntry.map((m) => ({
                  tipo: m.nombre,
                  fecha: m.fecha,
                  producto: m.producto.nombre,
                  cantidad: m.cantidad,
                }))
              );
            }

            break;
          case "radioSalida":
            let dataEntriesFilter = movements.filter(
              (m) => m.nombre === "Salida"
            );

            if (desde === "" && hasta === "") {
              if (valueInputDate.desde !== "" && valueInputDate.hasta !== "") {
                const desdeNumber = convertDateToNumberInput(
                  valueInputDate.desde
                );
                const hastaNumber = convertDateToNumberInput(
                  valueInputDate.hasta
                );

                let dataEntry = dataEntriesFilter.filter(
                  (m) =>
                    convertDateToNumberAPI(m.fecha) >= desdeNumber &&
                    convertDateToNumberAPI(m.fecha) <= hastaNumber
                );
                setData(
                  dataEntry.map((m) => ({
                    tipo: m.nombre,
                    fecha: m.fecha,
                    producto: m.producto.nombre,
                    cantidad: m.cantidad,
                  }))
                );
              }
            } else {
              const desdeNumber = convertDateToNumberInput(desde);
              const hastaNumber = convertDateToNumberInput(hasta);

              let dataEntry = dataEntriesFilter.filter(
                (m) =>
                  convertDateToNumberAPI(m.fecha) >= desdeNumber &&
                  convertDateToNumberAPI(m.fecha) <= hastaNumber
              );
              setData(
                dataEntry.map((m) => ({
                  tipo: m.nombre,
                  fecha: m.fecha,
                  producto: m.producto.nombre,
                  cantidad: m.cantidad,
                }))
              );
            }
            break;

          default:
            console.log("Tipo de movimiento no seleccionada");
            break;
        }
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

    if (valueRadioTipe !== "none" && valueRadioDate !== "none") {
      if (name === "desde") {
        if (valueInputDate.hasta !== "") {
          loadData(valueRadioTipe, valueRadioDate, value, valueInputDate.hasta);
        }
      } else {
        if (valueInputDate.desde !== "") {
          loadData(valueRadioTipe, valueRadioDate, valueInputDate.desde, value);
        }
      }
    }
  };

  const handleChangeRank = (e) => {
    const { id } = e.target;

    if (valueRadioTipe !== "none") {
      loadData(valueRadioTipe, id);
    }

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
                  onKeyDown={(e) => e.preventDefault()}
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
                  onKeyDown={(e) => e.preventDefault()}
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
              <ExcelFile
                element={
                  <Button className="mr-3" type="submit" variant="primary">
                    Generar reporte (Excel)
                  </Button>
                }
                filename="Reporte Movimiento"
              >
                <ExcelSheet data={data} name="Stock">
                  <ExcelColumn label="Tipo" value="tipo" />
                  <ExcelColumn label="Fecha" value="fecha" />
                  <ExcelColumn label="Producto" value="producto" />
                  <ExcelColumn label="Cantidad" value="cantidad" />
                </ExcelSheet>
              </ExcelFile>
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
