import PrivateMenu from "../molecules/PrivateMenu";

const Header = () => {
  return localStorage.getItem("token") ? <PrivateMenu /> : "";
};

export default Header;
