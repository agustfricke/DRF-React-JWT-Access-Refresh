import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Social Media App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {user ? (
            <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/protected">Protected</Nav.Link>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <Nav.Link href="/miPerfil">Mi Perfil</Nav.Link>
            <Nav.Link href="/blogForm">ADd Blogs</Nav.Link>
            <Button variant="warning" onClick={logoutUser}>Logout</Button>
            </>
          ) : (
            <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>

            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;