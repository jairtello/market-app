import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import ProductEntry from "./pages/ProductEntry";
import ProductOutput from "./pages/ProductOutput";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Categories from "./pages/Categories";
import Product from "./pages/Product";
import Protected from "./routes/Protected";
import Public from "./routes/Public";
import Header from "./organisms/Header";

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Protected path="/" exact component={Home} />
      <Protected path="/usuarios" exact component={Users} />
      <Protected path="/categorias" exact component={Categories} />
      <Protected path="/productos" exact component={Product} />
      <Protected path="/entrada-productos" exact component={ProductEntry} />
      <Protected path="/salida-productos" exact component={ProductOutput} />
      <Protected path="/reportes" exact component={Reports} />

      <Public path="/login" exact component={Login} />

      <Route component={Page404} />
    </Switch>
  </Router>
);

export default App;
