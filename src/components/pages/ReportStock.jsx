import { connect } from "react-redux";
import { useEffect } from "react";
import MaterialTable from "material-table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getAllProducts } from "../../redux/actionCreators";
import store from "../../redux/store";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const columns = [
  {
    title: "Nombre",
    field: "nombre",
  },
  {
    title: "Categoria",
    field: "categoria",
  },
  {
    title: "Precio unitario",
    field: "precioUni",
  },
  {
    title: "Stock",
    field: "cantidad",
  },
];

const ReportStock = ({ products }) => {

  useEffect(() => {
    store.dispatch(getAllProducts());
  }, []);

  let data = [];
  if (products !== undefined) {
    data = products.map((p) => ({
      nombre: p.nombre,
      categoria: p.categoria.descripcion,
      precioUni: p.precioUni,
      cantidad: p.cantidad,
    }));
  }

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <ExcelFile
            element={
              <Button variant="primary">
                Generar reporte (Excel)
              </Button>
            }
            filename="Reporte Stock"
          >
            <ExcelSheet data={data} name="Stock">
              <ExcelColumn label="Producto" value="nombre" />
              <ExcelColumn label="Categoría" value="categoria" />
              <ExcelColumn label="Precio Unitario" value="precioUni" />
              <ExcelColumn label="Stock" value="cantidad" />
            </ExcelSheet>
          </ExcelFile>
        </Col>
        <Col sm={8}>
          <MaterialTable
            columns={columns}
            data={data}
            title="Stock"
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
  products: state.productReducer.products,
});

export default connect(mapStateToProps, {})(ReportStock);
